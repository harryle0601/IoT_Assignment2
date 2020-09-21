
    
import authenticate as auth

if __name__ == "__main__":
    data = auth.take_picture()
    f = open("dataimg.txt", "a")
    f.write(data.hex())
    auth.decode(data)

