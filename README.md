# nodejs-baseproject

I'm starting to use nodejs as my backend technology. So, in that process, I start to understand and search for different examples. After that, I created my base project.

If this project is useful for you I will be happy.

All changes and commentaries are accepted.

## Installation

Use the package manager [npm] to install all dependencies.

```bash
npm install
```

You need to create an .env file and add the port and the mongo bd connection string

```bash
PORT=8080

MONGODB_CNN=mongodb+srv://USR:PASS@URL
```

## Usage

I recommend using the following commands to run the server.

```bash
tsc --watch

and in other terminal

```bash
nodemon dist/app.js

After that using postman, you can make a request. In the routes folder, you can get the definition of the methods.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
