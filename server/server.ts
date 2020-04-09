import app from './app'

const port = process.env.PORT || 3000;

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

app.listen(port, () => {
    console.log('Server running on port ' + port)
});
