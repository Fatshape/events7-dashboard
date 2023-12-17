import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  // Adding some test entries
  public events: EventDto[] = [
    {
      "id": "tom-hero-splash-ad",
      "name": "Tom Hero - Splash Screen",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dui accumsan, suscipit nisi eu, pellentesque odio.",
      "type": "ads",
      "priority": 8
    },
    {
      "id": "talking-angela-ad",
      "name": "Talking Angela - Subscription Screen",
      "description": "Nullam placerat diam at vehicula lobortis. Morbi a interdum nisi.",
      "type": "ads",
      "priority": 5
    },
    {
      "id": "video-support-call",
      "name": "Video Call - Support Team",
      "description": "Praesent odio libero, vestibulum eget fermentum sit amet, rutrum at nulla. Sed ultrices felis sit amet enim commodo pretium. Phasellus tincidunt nisi mauris, laoreet molestie nulla rhoncus at.",
      "type": "liveops",
      "priority": 1
    },
    {
      "id": "fortnite-crosspromo",
      "name": "Fortnite - Crosspromo",
      "description": "Cnsectetur adipiscing elit. Vivamus eget dui accumsan, suscipit nisi eu, pellentesque odio Lorem ipsum dolor sit amet.",
      "type": "crosspromo",
      "priority": 5
    },
    {
      "id": "game-01-open",
      "name": "Talking Tom - Opened",
      "description": "Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.",
      "type": "app",
      "priority": 8
    },
    {
      "id": "game-02-open",
      "name": "Talking Angela - Opened",
      "description": "Amet, rutrum at nulla. Sed ultrices felis sit amet enim commodo pretium hasellus tincidunt.",
      "type": "app",
      "priority": 9
    }
  ];

  // Return true if all properties exists
  private checkEventProperties (input: any) {
    return !['id',  'name',  'description',  'type',  'priority'].some(prop => input.hasOwnProperty(prop) === false );
  }

  // Return true if the type is on the list
  private checkEventType (type: string) {
    return (['crosspromo', 'liveops', 'app', 'ads'].indexOf(type) >= 0);
  }

  // Check "ads" permission
  private async checkAdsPermission (type: string, ip: string) {
    return new Promise((resolve) => {
      if ( type == 'ads' ) {
        
        // Use random Slovene IP if localhost
        if ( ip == '::1' ) ip = '91.246.250.204';

        // Fetch country code first
        fetch('http://ip-api.com/json/' + ip)
        .then( response => response.json() )
        .then( responseIp => {
          console.log('Your current IP: ' + ip);
          console.log('Your current country code: ' + responseIp.countryCode + ' (' + responseIp.country +')');
          
          fetch( // Check if pass
            'http://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner?countryCode=' + responseIp.countryCode,
            { 
              method: 'get', 
              headers: new Headers({
                'Authorization': 'Basic ' + btoa( process.env.FUN7_USER + ':' + process.env.FUN7_PASSWORD ),
                'Content-Type': 'application/x-www-form-urlencoded'
              })
            }
          )
          .then( response => response.json() )
          .then( response => {
            console.log('fun7-ad-partner response: ' + response.ads);
            
            ( response.ads == 'sure, why not!' ) ? resolve(true) : resolve(false);
          })
          .catch( () => resolve(false) );
        })
        .catch( () => resolve(false) );
      } else {
        resolve(true);
      }
    });
  }

  // URL friendly converter for IDs
  private toUrlFriendly(id: string) {
    return id.toString()            // Convert to string
    .normalize('NFD')               // Change diacritics
    .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
    .replace(/\s+/g,'-')            // Change whitespace to dashes
    .toLowerCase()                  // Change to lowercase
    .replace(/&/g,'-and-')          // Replace ampersand
    .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
    .replace(/-+/g,'-')             // Remove duplicate dashes
    .replace(/^-*/,'')              // Remove starting dashes
    .replace(/-*$/,'');             // Remove trailing dashes
  }

  // Priority checker & formater
  private priorityCheck(priority: any) {
    if (typeof priority != 'number') return 0;
    return Math.abs(priority) > 10 ? 10 : Math.abs(priority);
  }

  async create(event: EventDto, ip: string) {

    // Properties check
    if ( !this.checkEventProperties(event) ) return {
      status: 'Error',
      message: 'Missing event properties. See documentation.'
    }

    // Check if ID exists throw error
    if ( this.events.some(el => el.id == event.id) ) return {
      status: 'Error',
      message: 'Event with ID: "' + event.id + '" already exists!'
    }

    // We need to check the type on runtime separately
    if ( !this.checkEventType(event.type) ) return {
      status: 'Error',
      message: 'Event type "' + event.type + '" is not supported.'
    }

    // Convert to URL friendly ID
    event.id = this.toUrlFriendly(event.id);

    // Check if is priority between 0-10
    event.priority = this.priorityCheck(event.priority);

    // Check ads permmision
    if ( ! await this.checkAdsPermission(event.type, ip) ) return {
      status: 'Error',
      message: 'Sorry, your location (' + ip + ') is not allowed.'
    }

    this.events.push(event);
    return event;
  }

  findAll(): EventDto[] {
    return this.events;
  }

  findOne(id: string) {

    // Check if ID exists
    const foundElement = this.events.find(el => el.id == id);
    if ( foundElement ) return foundElement;

    // If ID doesn't exists throw error
    return {
      status: 'Error',
      message: 'Event with ID: "' + id + '" doesn\'t exists!'
    }
  }

  async update(id: string, event: EventDto, ip: string) {

    // Properties check
    if ( !this.checkEventProperties(event) ) return {
      status: 'Error',
      message: 'Missing event properties. See documentation.'
    }

    // If ID you want to replace doesn't exists throw error
    if ( !this.events.some(el => el.id == id) ) return {
      status: 'Error',
      message: 'Event with ID: "' + id + '" doesn\'t exists!'
    }

    // Check if Id you want to assign already exists. Carefully check if Id remains the same at first place.
    if (
      !( id == event.id ) &&
      this.events.some(el => el.id == event.id)
    ) return {
      status: 'Error',
      message: 'Event with ID: "' + event.id + '" you want to assign already exists. Try different one!'
    }

    // We need to check the type on runtime separately
    if ( !this.checkEventType(event.type) ) return {
      status: 'Error',
      message: 'Event type "' + event.type + '" is not supported.'
    }

    // Convert to URL friendly ID    
    event.id = this.toUrlFriendly(event.id);

    // Check if is priority between 0-10
    event.priority = this.priorityCheck(event.priority);

    // Check ads permmision
    if ( ! await this.checkAdsPermission(event.type, ip) ) return {
      status: 'Error',
      message: 'Sorry, your location (' + ip + ') is not allowed.'
    }

    // Replace the existing object with new one
    const index = this.events.findIndex(obj => obj.id == id);
    this.events[index] = event;

    return event;
  }

  remove(id: string) {
    // Check if ID exists
    if ( this.events.some(el => el.id == id) ) {

      // Remove
      this.events = this.events.filter( el => { return el.id != id; })

      return {
        status: 'OK',
        message: 'Event with ID: "' + id + '" removed.'
      }
    }

    // If ID doesn't exists throw error
    return {
      status: 'Error',
      message: 'Event with ID: "' + id + '" doesn\'t exists!'
    }
  }

  urlFriendly(id: string)  {
    if (id) return this.toUrlFriendly(id);

    // If ID doesn't exists throw error
    return {
      status: 'Error',
      message: 'No ID.'
    }
  }
}
