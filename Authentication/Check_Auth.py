
    
import authenticate as auth

if __name__ == "__main__":
    data = auth.take_picture()
    print(type(data))
    auth.decode(data)

