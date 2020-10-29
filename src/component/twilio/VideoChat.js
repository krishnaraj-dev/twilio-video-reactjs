import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import { Toast } from 'services/toast';

const { isSupported } = require('twilio-video');

if (!isSupported) {
  // Set up your video app.
  Toast({ type: "error", message: 'This browser is not supported by twilio-video', time: "6000" })
}

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    (async () => {
      const data = await fetch('/token', {
        method: 'post',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());

      setToken(data.token);
    })();
  }, [roomName, username]);

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {

    function stopMediaTracks(stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    function gotDevices(mediaDevices) {
      const select = document.getElementById('select');
      select.innerHTML = '';
      select.appendChild(document.createElement('option'));
      let count = 1;
      mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
          const option = document.createElement('option');
          option.value = mediaDevice.deviceId;
          const label = mediaDevice.label || `Camera ${count++}`;
          const textNode = document.createTextNode(label);
          option.appendChild(textNode);
          select.appendChild(option);
        }
      });
    }

    let currentStream;
    function getDeviceCamera() {
      const select = document.getElementById('select');
      const video = document.getElementById('video');

      if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
      }
      const videoConstraints = {};
      if (select == null || select.value === '') {
        videoConstraints.facingMode = 'user';
      } else {
        videoConstraints.deviceId = { exact: select.value };
      }
      const constraints = {
        video: videoConstraints,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          currentStream = stream;
          video.srcObject = stream;
          return navigator.mediaDevices.enumerateDevices();
        })
        .then(gotDevices)
        .catch(error => {
          // alert(error);
        });
    };

    navigator.mediaDevices.enumerateDevices().then(gotDevices);
    setTimeout(() => {
      getDeviceCamera()
    }, 1000)

    // createLocalTracks(
    //   {
    //     audio: true,
    //     video: { width: 150, facingMode: 'user' }
    //   }
    // ).then(function (localTracks) {
    //   let localMediaContainer = document.getElementById('local-media-container-id');
    //   localMediaContainer.innerHTML = ''
    //   localTracks.forEach(function (track) {
    //     localMediaContainer.appendChild(track.attach());
    //   });
    // }).catch(error => {
    //   let localMediaContainer = document.getElementById('local-media-container-id');
    //   localMediaContainer.innerHTML = ''
    //   localMediaContainer.innerHTML = error.message
    // });

    render = (
      <>
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
        <div className="controls pt-4">
          <br />
          Video Test:
          <br />
          <button id="button" onClick={getDeviceCamera}>Get camera</button>
          <select id="select"></select>
        </div>

        <video id="video" width="140px" autoPlay playsInline></video>

        {/* <br />
        Using : createLocalTracks
        <br />
        <div id="local-media-container-id"></div> */}
      </>
    );
  }
  return render;
};

export default VideoChat;
