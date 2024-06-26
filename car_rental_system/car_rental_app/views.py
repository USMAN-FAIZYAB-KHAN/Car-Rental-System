from django.shortcuts import render

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
    return render(request, 'login.html')

def carList(request):
    return render(request, 'carList.html')

def carDetail(request):
    return render(request, 'carDetail.html')

def signup(request):
    return render(request, 'signup.html')
