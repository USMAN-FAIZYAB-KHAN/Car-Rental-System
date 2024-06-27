from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login, authenticate

User = get_user_model()

# Create your views here.
def home(request):
    # print(request.path)
    if request.user.is_authenticated:
        return render(request, 'home.html', {"user": request.user})
    return render(request, 'home.html')

def about(request):
    print(request.path)
    return render(request, 'about.html', {"user": request.user})

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
    return render(request, 'carList.html', {"user": request.user})

def carDetail(request):
    return render(request, 'carDetail.html', {"user": request.user})

def userDashboard(request):
    return render(request, 'userdashboard.html')


def signup(request):
    if request.method == 'POST':
        firstname = request.POST['first_name']
        lastname = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']

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
