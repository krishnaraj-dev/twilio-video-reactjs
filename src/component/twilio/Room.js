import React, { useState, useEffect } from 'react';
import Participant from './Participant';
import { Toast } from 'services/toast';

const { connect, createLocalTracks, LocalDataTrack } = require('twilio-video');

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
      console.log(`Participant connected: ${participant.identity}`);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
      console.log(`Participant disconnected: ${participant.identity}`);
    };



    (async () => {
      const tracks = await createLocalTracks();
      const dataTrack = await LocalDataTrack();

      connect(token, {
        name: roomName,
        tracks: [dataTrack]
      }).then((room) => {
        alert(2)

        room.on('trackSubscribed', function (track) {
          track.on('message', function (message) {
            const messages = document.getElementById('message');
            messages.innerHTML = JSON.parse(message)
            console.log(JSON.parse(message)); // { x: <number>, y: <number> }
          });
        });

        const dataTrackPublished = {};

        dataTrackPublished.promise = new Promise((resolve, reject) => {
          dataTrackPublished.resolve = resolve;
          dataTrackPublished.reject = reject;
        });

        room.localParticipant.on('trackPublished', publication => {
          if (publication.track === dataTrack) {
            dataTrackPublished.resolve();
          }
        });

        room.localParticipant.on('trackPublicationFailed', (error, track) => {
          if (track === dataTrack) {
            dataTrackPublished.reject(error);
          }
        });

        function sendMessage(message) {
          dataTrackPublished.promise.then(() => dataTrack.send(message));
        }

        sendMessage('hellow')

      });


      const video = connect(token, {
        name: roomName,
        tracks: tracks
      }).then((room) => {

        alert(1)
        setRoom(room);

        room.participants.forEach(participantConnected);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);

        room.once('disconnected', (error) => room.participants.forEach(participantDisconnected));

      }).catch(error => {
        Toast({ type: "info", message: `Could not connect to the Room: ${error.message}`, time: "6000" })
      });

      window.addEventListener('beforeunload', () => video.disconnect());
      window.addEventListener('pagehide', () => video.disconnect());
    })();

    return () => {
      setRoom(currentRoom => {
        console.log(currentRoom && currentRoom.localParticipant, 'currentRoom.localParticipant')

        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <div className="col-12">
        <div className="col-8">
          <div className="row">
            <h2>Room: {roomName}</h2>
            <button onClick={handleLogout}>Log out</button>
            <div className="local-participant">
              {room ? (
                <Participant
                  key={room.localParticipant.sid}
                  participant={room.localParticipant}
                />
              ) : (
                  ''
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
            <div id="message">test</div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div id="channel-chat">
              <div id="channel-messages"><ul></ul></div>
              <div id="channel-message-send">
                <div id="typing-indicator"><span></span></div>
                <input type="textbox" id="message-body-input"></input>
                <button id="send-message" className="red-button">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Room;
