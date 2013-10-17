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
            this.fileAction(magazine, this.fileToStorage);
        },
        onRemove: function(magazine) {
            magazine.set({
                downloading: false
            });
        },
        removeDatas: function(magazine) {
            this.fileAction(magazine, this.fileRemoveDatas);
        },
        fileAction: function(magazine, action) {

            if (!App.isPhonegap){ App.modalRegion.close(); return; }

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(error) {
                console.log('requestFileSystemFailed : ' + error);
            });

            function gotFS(fileSystem) {
                console.log('Got Filesystem');
                fileSystem.root.getFile(magazine.get('id') + ".apk", {
                    create: true,
                    exclusive: false
                }, function(fileInfo){action(magazine,fileInfo);}, getFileFailed);
            }

            function getFileFailed(error) {
                console.log('getFileFailed : ' + error);
            }
        },
        fileToStorage: function(magazine,fileInfo) {
            console.log('downloading : ' + fileInfo);
            var ft = new FileTransfer();

            ft.onprogress = function(progressEvent) {
                console.log(progressEvent);
                magazine.set('dlProgress', Math.floor(progressEvent.loaded / progressEvent.total * 50));
            };

            ft.download(
            magazine.get('downloadUrl'),
            fileInfo.fullPath,

            function(entry) {
                console.log("download complete: " + entry.fullPath);
                magazine.set('uploadTime', moment().format("DD-MM-YYYY"));
                magazine.checkDlAvailable();
                magazine.set('localData', true);
                magazine.endDownload();
            },

            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            true); // accepts all certificates if set to true.
        },
        fileRemoveDatas: function(magazine,fileInfo) {
            console.log('removing : ' + fileInfo.fullPath);
            fileInfo.remove(success, fail);

            function success(fileInfo) {
                console.log('file removal suceed !');
                magazine.set('localData', false);
                magazine.endDownload();
                App.modalRegion.close();
            }

            function fail(error) {
                console.log('file removal failed : ' + error.code);
            }
        }


    });
    return Downloads;
});
