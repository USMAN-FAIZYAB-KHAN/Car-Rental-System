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

# def logIn(request):
#     return render(request, 'Login.html')

# def signUp(request):
#     return render(request, 'Signup.html')
