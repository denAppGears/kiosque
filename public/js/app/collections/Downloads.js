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
            this.fileAction(magazine, this.fileToStorage,true,".apk");
        },
        onRemove: function(magazine) {
            magazine.set({
                downloading: false
            });
        },
        removeDatas: function(magazine) {
            this.fileAction(magazine, this.fileRemoveDatas,false,".apk");
        },
        loadDatas: function(magazine) {
             this.fileAction(magazine, this.fileReadInfos,false,".json");
        },
        writeInfos: function(magazine) {
             this.fileAction(magazine, this.fileWriteInfos,true,".json");
        },
        fileAction: function(magazine, action, create, ext) {
            var that = this ;
            if (!App.isPhonegap) return;

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(error) {
                console.log('requestFileSystemFailed : ' + error);
            });

            function gotFS(fileSystem) {
                    console.log('Got Filesystem');
                    fileSystem.root.getDirectory( 'mag_' + magazine.get('id'), {create: create, exclusive: false}, function(dirEntry){
                        dirEntry.getFile( 'datas' + ext, { create: create, exclusive: false}, getFileSucceed, getFileFailed);
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
        fileToStorage: function(magazine,fileInfo) {
            console.log('downloading : ' + fileInfo);
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
                    that.writeInfos(magazine);
                    
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
            var win = function win(writer) {
                writer.onwrite = function(evt) {
                        console.log("write infofile success");
                        magazine.set('localVersion', magazine.get('serverVersion') );
                        magazine.set('localData', true);
                        magazine.endDownload();
                    };
                    writer.write('{ "id" : "'+ magazine.get('id') +'" , "localVersion" : "'+ magazine.get('serverVersion')+'" }');
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
