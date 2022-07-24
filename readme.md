# Image Processing API
This Project Is Part of Udacity Advanced Full Stack Nano Degree
## Scripts

    *format => to run prettier then eslint.
    *server => to run nodemon.
    *create => to run tsc(the script for tsc only => npm run build) then to run jasmine(the script to jasmine only is =>npm run test).

## Notes:

    * there is a console.log fucntion in the project to print every time resizing image path and to print if the thumb image accessed.

## start endpoint

    localhost:2022 => this like an interance to the server with guide message to what to do

## right url to resize image

    localhost:2022/image?filename=(image file name)&width=(in numbers)&height=(in numbers)

    ex: this urls should return resized photo
        ==> localhost:2022/image?filename=encenadaport&width=1920&height=1080

        ==> localhost:2022/image?filename=fjord&width=1920&height=1080

        ==> localhost:2022/image?filename=santamonica&width=1920&height=1080


about express req, res types i google it and i found this page it was so usefull to me 

link ==> https://typescript.tv/hands-on/how-to-type-express-js-middleware/
