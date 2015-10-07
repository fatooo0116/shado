module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),


        /*
        *  Sass task
        * */


        sass:{
            dev:{
                options:{
                    style:'expanded',
                    sourcemap:'none'
                },
                files:{
                    'compiled/style.css':'sass/style.scss',
                    'compiled/bootstrap.css':'sass/bootstrap.scss'
                }
            },
            dist:{
                options:{
                    style:'compressed',
                    sourcemap:'none'
                },
                files:{
                    'compiled/style-min.css':'sass/style.scss'
                }
            }
        },


        /*
        * watch task
        * */
        watch:{
            options:{livereload: true},
            css:{
                files:'**/*.scss',
                tasks:['sass']
            },
            html:{
                files:[
                    '*.php'
                ],
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask('default',['watch']);
}