# **Backend Config**

## Production Config
Packages used and a little explanation about then:

**Express**: Imported to make a real server

## **Dev Config**
**typescript**: Use typescript at this project;

**ts-node-dev**: Transpile code to javascript, watch every change and reload the server ( similar to nodemon, sucrase and other ) and allow us to use the new sintax of javascript;

**@types/***: There are packages that don't have a definition file for typescript (**.d.ts**), so we need to import manually.

# **Scripts**

**build**: build our app for production;

**dev:server**: start server at development stage with some optimization ( *--transpileOnly* do not verify errors at the files ***.ts** and *--ignorewatch* [folder] that no not transpile the ts files of specific folder );

