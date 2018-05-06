;(function($) {
 
  $.fn.webCamera = function(method) {

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
    
            var width = defaults.video.Width,
                height = defaults.video.Height;
    
            if (width && height) {
    
              // Setup a canvas with the same dimensions as the video.
              hidden_canvas.width = width;
              hidden_canvas.height = height;
    
              // Make a copy of the current frame in the video on the canvas.
              context.drawImage(defaults.video, 0, 0, width, height);
    
              // Turn the canvas image into a dataURL that can be used as a src for our photo.
              return hidden_canvas.toDataURL('image/png');
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
                defaults.image.setAttribute('src', snap);
                defaults.image.classList.add("visible");

                // Enable delete and save buttons
                defaults.delete_photo_btn.classList.remove("disabled");
                defaults.download_photo_btn.classList.remove("disabled");

                // Set the href attribute of the download button to the snap url.
                defaults.download_photo_btn.href = snap;

                // Pause video playback of stream.
                defaults.video.pause();

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
        init:function(){
          const _this = this
          navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

            if(!navigator.getMedia){
              settings.displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
            }
            else{
      
              // Request the camera.
              navigator.getMedia(
                {
                  video: true
                },
                // Success Callback
                function(stream){
      
                  // Create an object URL for the video stream and
                  // set it as src of our HTLM video element.
                  defaults.video.src = window.URL.createObjectURL(stream);
      
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