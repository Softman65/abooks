;(function($) {
 
  $.fn.webCamera = function(method,pushPicture) {

      var defaults = {
        video : document.querySelector('#camera-stream'),
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
         pushPicture:pushPicture,
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
              defaults.download_photo_btn.innerText = _type=='photo'?'camera_alt':'play_arraw'
              // Request the camera.
              navigator.getMedia(
                {
                  video: true
                },
                // Success Callback
                function(stream){
                  defaults.delete_photo_btn.classList.add("hidden");
                  defaults.download_photo_btn.classList.add("hidden");
                  // Create an object URL for the video stream and
                  // set it as src of our HTLM video element.
                  defaults.video.srcObject = stream;
      
                  // Play the video element to start the stream.
                  defaults.video.play();
                  defaults.video.onplay = function() {
                    settings.showVideo();
                    settings.captureEvents( defaults.video)
                  };
      
                },
                // Error Callback
                function(err){
                  settings.displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
                }

                

                

              );
      
            }  
        },
         showVideo:function(){
            // Display the video stream and the controls.
    
            this.hideUI();
            defaults.video.classList.add("visible");
            defaults.controls.classList.add("visible");
          },

         takeSnapshot:function(){
            // Here we're using a trick that involves a hidden canvas element.  
    
            var hidden_canvas = document.querySelector('canvas'),
                context = hidden_canvas.getContext('2d');
                

            var width = defaults.video.clientWidth,
                height = defaults.video.clientHeight;
    
            if (width && height) {
    
              // Setup a canvas with the same dimensions as the video.
              hidden_canvas.width = width/2;
              hidden_canvas.height = height/2;
    
              // Make a copy of the current frame in the video on the canvas.
              context.scale(0.5,0.5);
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
  
          defaults.controls.classList.remove("visible");
          defaults.start_camera.classList.remove("visible");
          defaults.video.classList.remove("visible");
          defaults.snap.classList.remove("visible");
          defaults.error_message.classList.remove("visible");
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


              defaults.take_photo_btn.addEventListener("click", function(e){

                e.preventDefault();

                defaults.snap = settings.takeSnapshot();

                // Show image. 
                defaults.image.setAttribute('src', defaults.snap);
                defaults.image.classList.add("visible");

                // Enable delete and save buttons
                defaults.delete_photo_btn.classList.remove("disabled");
                defaults.download_photo_btn.classList.remove("disabled");
                // Set the href attribute of the download button to the snap url.
                if(settings.pushPicture!=null){
                  defaults.download_photo_btn.addEventListener("click", function(e){
                    settings.pushPicture(defaults.snap)
                  })
                }else{
                  defaults.download_photo_btn.href = defaults.snap;
                }

                // Pause video playback of stream.
                defaults.video.pause();
                defaults.video.add("hidden")
              });


              defaults.delete_photo_btn.addEventListener("click", function(e){

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