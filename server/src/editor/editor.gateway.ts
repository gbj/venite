import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

import { User, Change, Cursor } from '@venite/ldf';

// color generation
import * as Please from 'pleasejs';

const DOCS = {
  'abc123': {
    type: 'liturgy',
    metadata: {
      preferences: {}
    },
    value: [
      {type: "heading", metadata: {length: 60 } },
      {type: "heading", metadata: {level: 1 }, label: "Compline"},
      {type: "heading", metadata: {level: 2 }, label: "Wednesday after the Third Sunday of Easter"},
      {type: "heading", citation: { source: 'BCP', citation: 'p. 127' }},
      {type: "text", metadata: { response: "Amen." }, value: ["The Lord Almighty grant us a peaceful night and a perfect end."]},
      {type: "responsive", style: "preces", value: [
        { label: "Officiant", text: "Our help is in the Name of the Lord." },
        { label: "People", text: "The maker of heaven and earth."}
      ]},
      {type: "text", value: ["Let us confess our sins to God."] },
      {type: "text", style: "prayer", value: [`Almighty God, our heavenly Father:\nWe have sinned against you,
through our own fault,
in thought, and word, and deed,
and in what we have left undone.
For the sake of your Son our Lord Jesus Christ,
forgive us all our offenses;
and grant that we may serve you
in newness of life,
to the glory of your Name.`]},
      {type: "text", style: "prayer", value: ['May the Almighty God grant us forgiveness of all our sins, and the grace and comfort of the Holy Spirit.']},
      {type: "responsive", style: "preces", value: [
        { label: "Officiant", text: "O God, make speed to save us." },
        { label: "People", text: "O Lord, make haste to help us."}
      ]},
      {type: "refrain", style: "gloria", value: [`Glory&nbsp;to&nbsp;the&nbsp;Father,&nbsp;and&nbsp;to&nbsp;the&nbsp;Son, and&nbsp;to&nbsp;the&nbsp;Holy&nbsp;Spirit:`,`as&nbsp;it&nbsp;was&nbsp;in&nbsp;the&nbsp;beginning,&nbsp;is&nbsp;now, and&nbsp;will&nbsp;be&nbsp;for&nbsp;ever.&nbsp;Amen.`]},
      {type: "text", value: ['Alleluia.']},
      {type: "option", metadata: { selected: 0 }, value: [
        {type: "text", style: "prayer", label: "The Lord’s Prayer", version_label: "Traditional", value: [`Our Father, who art in heaven,
  hallowed be thy Name,
  thy kingdom come,
  thy will be done,
  on earth as it is in heaven.
Give us this day our daily bread.
And forgive us our trespasses,
  as we forgive those
  who trespass against us.
And lead us not into temptation,
  but deliver us from evil.`]},
  {type: "text", style: "prayer", label: "The Lord’s Prayer", version_label: "Contemporary", value: [`Our Father in heaven,
  hallowed be your Name,
  your kingdom come,
  your will be done,
  on earth as in heaven.
Give us today our daily bread.
Forgive us our sins,
  as we forgive those
  who sin against us.
Save us from the time of trial,
  and deliver us from evil.`]}
      ]},
      {
        slug: 'psalm_80',
        label: 'Psalm 80',
        language: 'en',
        version: 'bcp1979',
        type: 'psalm',
        style: 'psalm',
        citation: 'BCP p. 897',
        metadata: {
          latinname: 'Qui regis Israel'
        },
        value: [
          [
            {
              number: '1',
              verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
              halfverse: 'shine forth, you that are enthroned upon the cherubim.'
            },
            {
              number: '2',
              verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
              halfverse: 'stir up your strength and come to help us.'
            },
            {
              number: '3',
              verse: 'Restore us, O God of hosts; *',
              halfverse: 'show the light of your countenance, and we shall be saved.'
            }
          ]
        ]
      },
      {type: "bible-reading", style: "long", citation: "John 1:1-6", label: "The Gospel", metadata: { intro: {type: 'responsive', style: 'responsive', value: [{text: 'The Holy Gospel of Our Lord Jesus Christ, according to ${shortName}.', response: 'Glory to you, Lord Christ.'}]}}},
    ],
  }
}

@WebSocketGateway()
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: User[] = new Array();

    async handleConnection(){
    }

    async handleDisconnect(){
    }

    getDoc(docId : string) {
      return DOCS[docId];
    }

    @SubscribeMessage('join')
    async onJoin(client, message : { userToken : string; docId: string; }) {
      // authenticate user token
      const username : string = message.userToken;

      // if logged in
      if(username !== '') {
        // join the document room
        client.join(message.docId);

        // load document from database
        const doc = this.getDoc(message.docId);

        // add user to list
        this.users.push(new User({
          client: client.id.toString(),
          username,
          color: Please.make_color()[0]
        }));

        // tell the person who joined who's there, and what the doc is
        client.emit('joined', {
          users: this.users,
          doc
        });

        // just give everyone else in the room the new list of users
        console.log(this.users);
        client.broadcast
          .emit('users', this.users);//.filter(user => user.room == message.docId));
      }
    }

    @SubscribeMessage('leave')
    async onLeave(client, docId : string) {
      client.leave(docId);
      this.users = this.users.filter(user => user.client !== client.id);
      client.to(docId)
        .emit('users', this.users.filter(user => user.room == docId));
    }

    @SubscribeMessage('docChanged')
    async onDocChanged(client, message : Change) {
      message.user = this.users.find(user => user.client == client.id).username;
      client.broadcast.emit('docChanged', message);
    }

    @SubscribeMessage('cursorMoved')
    async onCursorMoved(client, message : Cursor) {
      message.user = this.users.find(user => user.client == client.id).username;
      client.broadcast.emit('cursorMoved', message);
    }

    @SubscribeMessage('refreshDoc')
    async onRefreshDoc(client, docId : string) {
      client.emit(this.getDoc(docId));
    }
}
