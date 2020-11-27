# multipart/form-data

Example of how to upload an image and json object to spring boot server.
The spring boot server can be run from mulipart_spring.

### Run Spring Server
Probably the easiest way to run the server is to user the gradle wrapper. Open a console and go to the multipart_spring directory:
```
./gradlew bootRun
```

The console should show and few lines of logging and end with something like:
```
Started MultipartSpringApplication in 0.78 seconds (JVM running for 0.981)
```

The server is available on http://localhost:8080

## Run react in chrome no security
Because npm runs react on localhost:3000 when it tries to connect to the server on port 8080, you may see a 
Cross-Origin Resource Sharing (CORS) error.

You can try downloading a CORS plugin for chrome. The other way to get around this is to run chrome without security.
```
TMP_DIR=$(mktemp -d -t chrome-XXXXXXXX)
google-chrome --disable-web-security --user-data-dir=$TMP_DIR &
```

### Notes
When the server receives the file and person object successfully it returns this 'Upload called successfully' text in the response body.  
The react app extract this message and will show it on the front end.

Probably should disable the upload button on start up and then enable once an image has been selected, at the moment 
just does check that a file name is not present and returns.