define(["App", "jquery", "collections/Magazines"],

function(App, $, parentCollection) {
    var Downloads = parentCollection.extend({
        initialize: function(attributes) {
            this.on('add', this.onAdd);
            this.on('remove', this.onRemove);
        },
        onAdd: function(magazine) {
            magazine.set({
                downloading: true
            });
            this.fileAction(magazine, this.fileToStorage,true,".zip");
        },
        onRemove: function(magazine) {
            magazine.set({
                downloading: false
            });
        },
        removeDatas: function(magazine) {
            return this.fileAction(magazine, this.fileRemoveDatas,false,".zip");
        },
        loadDatas: function(magazine) {
            return this.fileAction(magazine, this.fileReadInfos,false,".json");
        },
        writeInfos: function(magazine) {
            return this.fileAction(magazine, this.fileWriteInfos,true,".json");
        },
        fileAction: function(magazine, action, create, ext) {
            var that = this ;
            if (!App.isPhonegap) return;

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(error) {
                console.log('requestFileSystemFailed : ' + error);
            });

            function gotFS(fileSystem) {
                    console.log('Got Filesystem');
                    fileSystem.root.getDirectory( 'mags', {create: create, exclusive: false}, function(dirEntry){
                        that.dirEntry = dirEntry;
                        dirEntry.getFile( magazine.get('id') + ext, { create: create, exclusive: false}, getFileSucceed, getFileFailed);
                    },getFileFailed);
            }
        
            function getFileSucceed (fileInfo){
                action.call(that,magazine,fileInfo);
            }
            function getFileFailed(error) {
                console.log('no file found');
                magazine.set('localData',false);
            }
        },
        fileUnzip : function (magazine,fileInfo){
            var that = this;
            var zipPath = fileInfo.fullPath;
            console.log('inflating : ' + zipPath);
            // using cordova unzip plugin https://github.com/MobileChromeApps/zip.git
            zip.unzip(zipPath, that.dirEntry.fullPath, function(){
                console.log('Magazine Unziped');
                _.each(App.collections.magazines.models,function(mag){
                       that.parseFileUrl(mag);
                       that.writeInfos(mag);
                });
                
                
            });
        },
        parseFileUrl : function(magazine){
            var that = this;
            var pathPrefix = encodeURI('file://' + that.dirEntry.fullPath.split('mags')[0]+ 'mags');
            var articlePath= '1/' + magazine.get('id');                                  
            var fail = function(evt) {
                console.log(error.code);
            };
            
            function win(file,entry) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    var pattern = /(\.\.\/mags|mags)/gi;
                    var parsed = evt.target.result.replace(pattern , pathPrefix);                                  
                    entry.createWriter(function(writer){
                        writer.onwrite = function(evt) {
                           console.log('write parsed url');
                        };
                        writer.write(parsed);
                    },fail);

                };
                reader.readAsText(file);
            }
        
        that.dirEntry.getFile( articlePath + '/parsed.html',{},function(entry){
                              entry.file( function(file){return win(file,entry);}, fail );},fail);
                                            
        that.dirEntry.getFile( articlePath + '/assets/css/parsed.css',{},function(entry){
                              entry.file(function(file){return win(file,entry);}, fail);},fail);
        },
        fileToStorage: function(magazine,fileInfo) {
            var zipPath = fileInfo.fullPath;
            console.log('downloading : ' + zipPath);
            var that = this;
            var ft = new FileTransfer();

            ft.onprogress = function(progressEvent) {
                console.log(progressEvent);
                var percents = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                magazine.set('dlProgress', percents);
                
            };

            ft.download(
                magazine.get('downloadUrl'),
                fileInfo.fullPath,
                function(entry) {
                    console.log("download complete: " + entry.fullPath);
                    that.fileUnzip(magazine,entry);
                },
    
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code" + error.code);
                    /* @todo make sure datas are removed id dl failed */
                },
                true // accepts all certificates if set to true.
            ); 
        },
        fileRemoveDatas: function(magazine,fileInfo) {
            console.log('removing : ' + fileInfo.fullPath);
            fileInfo.getParent(function(parentDir){
                parentDir.removeRecursively(success,fail);
            }, fail);

            function success(fileInfo) {
                console.log('file removal suceed !');
                magazine.set('localData', false);
                magazine.endDownload();
            }

            function fail(error) {
                console.log('file removal failed : ' + error.code);
            }
        },
        fileWriteInfos : function(magazine,fileInfo){
            var that = this;
            var win = function win(writer) {
                magazine.set('magPath', 'file://' + that.dirEntry.fullPath + '/1/' + magazine.get('id') ); //magazine.get('id')
                writer.onwrite = function(evt) {
                        console.log("write infofile success");
                        magazine.set('localVersion', magazine.get('serverVersion') );
                        magazine.set('localData', true);
                        magazine.endDownload();
                        console.log( magazine.get('magPath') );
                };
                writer.write('{ "id" : "'+ magazine.get('id') +'" , "localVersion" : "'+ magazine.get('serverVersion')+'","magPath": "'+magazine.get('magPath')+'" }');
            };
            
            var fail = function fail(error) {
                console.log(error.code);
            };
            fileInfo.createWriter(win, fail);
        },
        fileReadInfos : function(magazine,fileInfo){
            console.log('reading Infos : ' + fileInfo.fullPath);
            //fileInfo.getMetadata(success, fail);
            var win = function win(file) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    console.log("read success");
                    var infos = $.parseJSON(evt.target.result);
                    magazine.set('localVersion', infos.localVersion);
                    magazine.set('localData', true);
                    magazine.set('magPath',infos.magPath);
                };
                reader.readAsText(file);
            };
            
            var fail = function (error) {
                console.log(error.code);
            };

            fileInfo.file(win, fail);

        }
    });
    return Downloads;
});
