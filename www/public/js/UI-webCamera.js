;(function($) {
 
  var isSecureOrigin = location.protocol === 'https:' ||
  location.hostname === 'localhost';
  if (!isSecureOrigin) {
    alert('getUserMedia() solo functiona desde origenes seguros HTTPS o localhost.' +
      '\n\nCambiaremos automaticamente a HTTPS');
    location.protocol = 'HTTPS';
  }


  $.fn.webCamera = function(method,callbackOut) {

      var mediaSource = new MediaSource();
      mediaSource.addEventListener('sourceopen', function(){
        
        console.log('MediaSource opened');
        settings.sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
        console.log('Source buffer: ', settings.sourceBuffer);

      }, false);
      
      var defaults = {
        video : document.querySelector('#camera-stream'),
        video_player : document.querySelector('#camera-play'),
        image : document.querySelector('#snap'),
        snap : document.querySelector('#snap'),
        start_camera : document.querySelector('#start-camera'),
        controls : document.querySelector('.controls'),
        take_photo_btn : document.querySelector('#take-photo'),
        delete_photo_btn : document.querySelector('#delete-photo'),
        download_photo_btn : document.querySelector('#download-photo'),
        error_message : document.querySelector('#error-message')
      }

      var settings = {
         out:callbackOut,
         process:function(_type){
          const _this = this
          navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

            if(!navigator.getMedia){
              settings.displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
            }
            else{
             window._type = _type
             settings.showVideo();
              $('#take-photo .material-icons').html(window._type=='photo'?'camera_alt':'videocam')
              if(window._type=='photo'){
                // Request the camera.
                navigator.getMedia(
                  {
                    video: true
                  },
                  // Success Callback
                  function(stream){
                    //defaults.delete_photo_btn.classList.add("hidden");
                    //defaults.download_photo_btn.classList.add("hidden");
                    // Create an object URL for the video stream and
                    // set it as src of our HTLM video element.
                    defaults.video.srcObject = stream;
        
                    // Play the video element to start the stream.
                    defaults.video.play();
                    defaults.video.onplay = function() {
                      
                      settings.captureEvents( defaults.video)
                    };
        
                  },
                  // Error Callback
                  function(err){
                    settings.displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
                  }
                );
              }else{
                
                
                navigator.mediaDevices.getUserMedia( {
                  audio: true,
                  video: true
                }).then(function(stream) {
                          //recordButton.disabled = false;
                          console.log('getUserMedia() got stream: ', stream);
                          window.stream = stream;
                          defaults.video.srcObject = stream;
                          settings.captureEvents( defaults.video) 
                }).catch(function handleError(error) {
                  console.log('navigator.getUserMedia error: ', error);
                });

                settings.captureEvents( defaults.video)            
              }
      
            }  
        },
         showVideo:function(){
            // Display the video stream and the controls.
    
            this.hideUI();
            defaults.video.classList.add("visible");
            defaults.controls.classList.add("visible");
          },
          video:{
            startRecording:function() {
              settings.recordedBlobs = [];
              var options = {mimeType: 'video/webm;codecs=vp9'};
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = {mimeType: 'video/webm;codecs=vp8'};
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                  console.log(options.mimeType + ' is not Supported');
                  options = {mimeType: 'video/webm'};
                  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    console.log(options.mimeType + ' is not Supported');
                    options = {mimeType: ''};
                  }
                }
              }
              try {
                settings.mediaRecorder = new MediaRecorder(window.stream, {mimeType: 'video/webm'});
              } catch (e) {
                console.error('Exception while creating MediaRecorder: ' + e);
                alert('Exception while creating MediaRecorder: '
                  + e + '. mimeType: ' + options.mimeType);
                return;
              }

              settings.mediaRecorder.onstop = function(event) {
                console.log('Recorder stopped: ', event);
              };
              settings.mediaRecorder.ondataavailable = function(event) {
                if (event.data && event.data.size > 0) {
                  settings.recordedBlobs.push(event.data);
                }
              };
              settings.mediaRecorder.start(10); // collect 10ms of data  
              console.log('MediaRecorder started',settings.mediaRecorder);
            },
            playRecording: function(){
              //var superBuffer = new Blob(settings.recordedBlobs, {type: 'video/webm'});
              //defaults.video.src = window.URL.createObjectURL(superBuffer);
              defaults.video.play();
               // defaults.video.srcObject = settings.recordedBlobs
              // workaround for non-seekable video taken from
              // https://bugs.chromium.org/p/chromium/issues/detail?id=642012#c23
              //defaults.video.addEventListener('loadedmetadata', function() {
              //  if (defaults.video.duration === Infinity) {
              //    defaults.video.currentTime = 1e101;
              //    defaults.video.ontimeupdate = function() {
              //      defaults.video.currentTime = 0;
              //      defaults.video.ontimeupdate = function() {
              //        delete defaults.video.ontimeupdate;
              //        console.log('play')
              //        defaults.video.play();
              //      };
              //    };
              //  }
              //});
            }
          },
         takeSnapshot:function(){
            // Here we're using a trick that involves a hidden canvas element.  
    
            var hidden_canvas = document.querySelector('canvas'),
                context = hidden_canvas.getContext('2d');
                

            var width = defaults.video.clientWidth,
                height = defaults.video.clientHeight;
    
            if (width && height) {
    
              // Setup a canvas with the same dimensions as the video.
              hidden_canvas.width = width;
              hidden_canvas.height = height;
    
              // Make a copy of the current frame in the video on the canvas.
              //context.scale(0.5,0.5);
              context.drawImage(defaults.video, 0, 0, width, height);
              
              // Turn the canvas image into a dataURL that can be used as a src for our photo.
              var imgData = hidden_canvas.toDataURL('image/jpeg');
              //settings.pushPicture(imgData) //defaults.objDestino.setAttribute('src', imgData); 

              return imgData;
            }
        },
         displayErrorMessage:function(error_msg, error){
          error = error || "";
          if(error){
            console.log(error);
          }
  
          defaults.error_message.innerText = error_msg;
  
          this.hideUI();
          defaults.error_message.classList.add("visible");
        },
        hideUI:function (){
          // Helper function for clearing the app UI.
          $(defaults.video_player).removeClass('visible').addClass('hidden')
          defaults.controls.classList.remove("visible");
          defaults.start_camera.classList.remove("visible");
          defaults.video.classList.remove("visible");
          defaults.snap.classList.remove("visible");
          defaults.error_message.classList.remove("visible");
        },
        exit:function(urlToProcess,superBuffer,recordedBlobs){
          if(settings.out!=null){
            $(defaults.stopPropagation).off("click").click(
              function(e){
                if(window._type=='photo'){
                  settings.out(urlToProcess)
                }else{
                  settings.out(urlToProcess,superBuffer,recordedBlobs)
                }
                e.stop
            })
          //}else{
          //  defaults.download_photo_btn.href = imageToProcess;
          }
        },
        captureEvents:function(video){
                // Mobile browsers cannot play video without user input,
              // so here we're using a button to start it manually.
              


              defaults.start_camera.addEventListener("click", function(e){

                e.preventDefault();

                // Start video playback manually.
                defaults.video.play();
                settings.showVideo();

              });


              $(defaults.take_photo_btn).off('click').click(function(e){

                e.preventDefault();
                if(window._type=='photo'){
                    defaults.snap = settings.takeSnapshot();

                    // Show image. 
                    defaults.image.setAttribute('src', defaults.snap);
                    defaults.image.classList.add("visible");

                    // Enable delete and save buttons
                    defaults.delete_photo_btn.classList.remove("disabled");
                    defaults.download_photo_btn.classList.remove("disabled");
                    // Set the href attribute of the download button to the snap url.
                    //if(settings.pushPicture!=null){
                    //  defaults.download_photo_btn.addEventListener("click", function(e){
                    //    settings.pushPicture(defaults.snap)
                    //  })
                    //}else{
                    //  defaults.download_photo_btn.href = defaults.snap;
                    //}
                    // Pause video playback of stream.
                    defaults.video.pause();
                    settings.exit(defaults.snap)

                    //defaults.video.add("hidden")
                  }else{

                    if( $('#take-photo .material-icons').html()!='play_arrow'){
                      if( $('#take-photo .material-icons').html()!='stop'){
                        //start recording
                        settings.video.startRecording()
                        $('#take-photo .material-icons').html('stop')
                      }else{
                        //stop record
                        if($(defaults.video_player).hasClass('hidden')){
                          settings.mediaRecorder.stop();
                          defaults.video.pause();

                          var superBuffer = new Blob(settings.recordedBlobs, {type: 'video/webm'});
                        
                          defaults.video_player.src = window.URL.createObjectURL(superBuffer);
                          $(defaults.video_player).addClass('visible').removeClass('hidden') //.src = window.URL.createObjectURL(superBuffer);
                          
                          const width = defaults.video.offsetWidth,
                          height = defaults.video.offsetHeight;
                          $(defaults.video).removeClass('visible')
                          if (width && height) {
                  
                            // Setup a canvas with the same dimensions as the video.
                            defaults.video_player.width = width;
                            defaults.video_player.height = height;
                                    // Disable delete and save buttons
                            $(defaults.delete_photo_btn).removeClass("disabled");
                            $(defaults.download_photo_btn).removeClass("disabled");
                          
                            defaults.video_player.onended  = function(event) {
                              $('#take-photo .material-icons').html('play_arrow')
                              debugger
                              console.log('Player stopped: ', event);
                            };
                            console.log('Recorded Blobs: ', settings.recordedBlobs);
                            settings.exit(window.URL.createObjectURL(superBuffer),superBuffer, settings.recordedBlobs)
                          }
                          //recordedVideo.controls = true;
                        }else{
                          defaults.video_player.pause()
                        }
                        $('#take-photo .material-icons').html('play_arrow')
                      }
                    }else{
                      $('#take-photo .material-icons').html('stop')
                      defaults.video_player.play()
                    }
                    
                  }
                  
              });

              
              $(defaults.delete_photo_btn).off('click').click( function(e){

                e.preventDefault();

                // Hide image.
                defaults.image.setAttribute('src', "");
                defaults.image.classList.remove("visible");

                // Disable delete and save buttons
                defaults.delete_photo_btn.classList.add("disabled");
                defaults.download_photo_btn.classList.add("disabled");

                // Resume playback of stream.
                defaults.video.play();

              });
        }

      }

      var methods = {
        video:function(){
          settings.process('video')
        },
        photo:function(){
          settings.process('photo')
        }
      }
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        $.error( 'Method "' +  method + '" does not exist in pluginName plugin!');
    }
  }
})(jQuery);