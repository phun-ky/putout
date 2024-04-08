__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "file",
        "filename": "/package.json"
    }, {
        "type": "directory",
        "filename": "/lib",
        "files": [{
            "type": "file",
            "filename": "/lib/hello.cts",
            "content": "import hello from '../src/hello.js'"
        }]
    }]
});

// module
__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "file",
        "filename": "/package.json",
        "content": "eyJ0eXBlIjoibW9kdWxlIn0"
    }, {
        "type": "directory",
        "filename": "/lib",
        "files": [{
            "type": "file",
            "filename": "/lib/hello.cts",
            "content": "import hello from '../src/hello.js'"
        }]
    }]
});

// commonjs
__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "type": "file",
        "filename": "/package.json",
        "content": "eyJ0eXBlIjoiY29tbW9uanMifQ=="
    }, {
        "type": "directory",
        "filename": "/lib",
        "files": [{
            "type": "file",
            "filename": "/lib/hello.cts",
            "content": "import hello from '../src/hello.js'"
        }]
    }]
});
