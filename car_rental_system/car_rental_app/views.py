
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json
from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login, authenticate, logout
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Car, CarImage, CarVariant, CarModel, Rental, RentalStatus, Payment, Review
from django.db.models import Q
from datetime import datetime
from django.contrib.auth.decorators import login_required

User = get_user_model()


def home(request): 
    cars = Car.objects.all()
    completed_orders_count = Rental.objects.filter(status__name='Completed').count()
    customers_count = User.objects.filter(user_type__type_name='Customer').count()
    total_vehicles_count = Car.objects.count()

    if request.user.is_authenticated:
        return render(request, 'home.html', {"user": request.user, 'cars': cars, 'completed_orders_count': completed_orders_count, 'customers_count': customers_count, 'total_vehicles_count': total_vehicles_count}) 
    
    return render(request, 'home.html', {'cars': cars, 'completed_orders_count': completed_orders_count, 'customers_count': customers_count, 'total_vehicles_count': total_vehicles_count})

def about(request):
    completed_orders_count = Rental.objects.filter(status__name='Completed').count()
    customers_count = User.objects.filter(user_type__type_name='Customer').count()
    total_vehicles_count = Car.objects.count()
    
    return render(request, 'about.html', {"user": request.user, "completed_orders_count": completed_orders_count, "customers_count": customers_count, "total_vehicles_count": total_vehicles_count})

def contact(request):
    print(request.path)
    return render(request, 'contact.html', {"user": request.user})

def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, username=email, password=password)

        if user:
            django_login(request, user)
            return redirect('home')
        
        return render(request, 'login.html', {'error': 'Invalid Credentials'})
            
    elif request.user.is_authenticated:
        return redirect('home')
    
    return render(request, 'login.html')

        
def carList(request):

    cars_list = Car.objects.all()
    cars_list.order_by('variant__model__year')
    query_params = request.GET
    
    minPrice = query_params.get('minPrice', None)
    maxPrice = query_params.get('maxPrice', None)
    categories = query_params.get('categories', None)

    if minPrice and maxPrice:
        cars_list = cars_list.filter(price_per_day__gte=minPrice, price_per_day__lte=maxPrice)

    if categories:
        categories = categories.split(',')
        filter_conditions = Q()
        for category in categories:
            filter_conditions |= Q(variant__model__category__name=category)
        cars_list = cars_list.filter(filter_conditions)    

    p = Paginator(cars_list, 1)
    # get the page number from the request
    page_number = request.GET.get('page')

    try:
        cars = p.get_page(page_number)
    
    except PageNotAnInteger:
        cars = p.get_page(1)
    
    # if the page number is greater than the total number of pages
    except EmptyPage:
        cars = p.get_page(p.num_pages)

    return render(request, 'carList.html', {"user": request.user, "cars": cars})


def carDetail(request, car_id):

    car = Car.objects.get(car_id=car_id)
    images = car.images.all()

    if request.method == 'POST':
        if not request.user.is_authenticated:
            message = {'error': 'You need to login to book a car'}
            return JsonResponse(message)
        elif request.body:
            data = json.loads(request.body)
            booking_date = datetime.now()
            pickup_date = datetime.strptime(data['pickDate'], '%Y-%m-%d')
            drop_date = datetime.strptime(data['dropDate'], '%Y-%m-%d')
            no_of_days = (drop_date - pickup_date).days
            total_price = no_of_days * car.price_per_day

            user = request.user

            user.address = data['address']

            rental = Rental.objects.create(user=user, car=car, booking_date=booking_date, pickup_date=pickup_date, drop_date=drop_date, total_cost=total_price, status=RentalStatus.objects.get(name='Scheduled'))
            payment = Payment.objects.create(rental=rental, payment_type='Advance', payment_method='Online', payment_date=booking_date, amount=total_price)

            user.save()
            rental.save()
            payment.save()
            return redirect('userdashboard')
        else:
            fname = request.user.first_name
            lname = request.user.last_name
            username = fname + " " + lname
            message = {'success': 'success', 'username': username}
            return JsonResponse(message)
        
       
            

    return render(request, 'carDetail.html', {"user": request.user, "car": car, "car_images": images, "display_form": False})

@login_required
def userDashboard(request):

    scheduled_orders = Rental.objects.filter(user=request.user, status__name='Scheduled')
    completed_orders = Rental.objects.filter(user=request.user, status__name='Completed')
    cancelled_orders = Rental.objects.filter(user=request.user, status__name='Cancelled')
    cars_rented = Rental.objects.filter(user=request.user).values('car__variant__variant_name').distinct().count()
    return render(request, 'userdashboard.html')

    if request.method == 'POST':
        data = {'upcoming_orders': scheduled_orders.count(), 'completed_orders': completed_orders.count(), 'cancelled_orders': cancelled_orders.count(), 'cars_rented': cars_rented}
        return JsonResponse(data)



def signup(request):
    if request.method == 'POST':
        
        firstname = request.POST['first_name']
        lastname = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        print(firstname, lastname, email, password)
        if User.objects.filter(email=email).exists():
            return render(request, 'signup.html', {'error': 'Email already exists'})
        
        # Create the user
        user = User.objects.create_user(email=email, password=password, first_name=firstname, last_name=lastname)
        user.save()
            
        # Authenticate and login the user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            django_login(request, user)
            return redirect('home')
        else:
            return render(request, 'signup.html', {'error': 'Authentication failed'})
        
    elif request.user.is_authenticated:
        return redirect('home')

    return render(request, 'signup.html')


def logout_user(request):
    

    if request.method == "GET":

        logout(request)
        message = {'status': 'success'}
        return JsonResponse(message)

def review_dashboard(request):
    Review = Review.objects.all()

    if request.method == "POST":
        review = json.loads(request.body)
        review_message = review['message']
        review_rating = int(review['rating'])
        review_date = datetime.now()


        
        car_id = review['car_id']
        car = Car.objects.get(car_id=car_id)
        user = request.user


        Review.objects.create(comment=review_message, rating=review_rating, review_date=review_date)


        message = {'status': 'success'}
        return JsonResponse(message)

    return render(request, 'reviewdashboard.html')