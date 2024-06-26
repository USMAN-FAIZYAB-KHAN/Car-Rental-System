from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth import login, authenticate

User = get_user_model()

# Create your views here.
def home(request):
    print(request.path)
    return render(request, 'home.html')

def about(request):
    print(request.path)
    return render(request, 'about.html')

def contact(request):
    print(request.path)
    return render(request, 'contact.html')

def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        print(email, password)

        # user = authenticate(request, email=email, password=password)
        # if user is not None:
        #     login(request, user)
        #     return render(request, 'home.html')
        # else:
        #     return render(request, 'login.html', {'error': 'Invalid email or password'})
        

    return render(request, 'login.html')

def carList(request):
    return render(request, 'carList.html')

def carDetail(request):
    return render(request, 'carDetail.html')


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
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request)
            return redirect('home')
        else:
            return render(request, 'signup.html', {'error': 'Authentication failed'})
            
        # except Exception as e:
        #     return render(request, 'signup.html', {'error': f'Error creating user: {str(e)}'})

    return render(request, 'signup.html')

# def signup(request):
#     if request.method == 'POST':
#         firstname = request.POST['first_name']
#         lastname = request.POST['last_name']
#         email = request.POST['email']
#         password = request.POST['password']

#         if User.objects.filter(email=email).exists():
#             print("1")
#             return render(request, 'signup.html', {'error': 'Email already exists'})
        
#         try:
#             # Create the user
#             user = User.objects.create_user(username=email, password=password, first_name=firstname, last_name=lastname)
#             user.save()
            
#             # Authenticate and login the user
#             user = authenticate(email, password)
#             print(user is not None)
#             if user is not None:
#                 print("here")
#                 return redirect('home')
#             else:
#                 print("3")
#                 return render(request, 'signup.html', {'error': 'Authentication failed'})
            
#         except Exception as e:
#             return render(request, 'signup.html', {'error': f'Error creating user: {str(e)}'})

#     return render(request, 'signup.html')

