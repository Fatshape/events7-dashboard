import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  describe('create', () => {
    it('should create an event', async () => {
      const event: EventDto = {
        'id': 'test-01',
        'name': 'Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };
      const ip = '91.246.250.204';

      const result = await controller.create(event, ip);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should list all events', async () => {
      const event: EventDto = {
        'id': 'test-01',
        'name': 'Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };

      const ip = '91.246.250.204';

      await controller.create(event, ip);

      const result = await controller.findAll();
      expect(result.find( el => el.id === 'test-01')).toBe(event);
    });
  });

  describe('findOne', () => {
    it('should show the event with ID', async () => {
      const event: EventDto = {
        'id': 'test-01',
        'name': 'Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };

      const ip = '91.246.250.204';

      await controller.create(event, ip);

      const result = await controller.findOne('test-01');
      expect(result).toBe(event);
    });
  });

  describe('update', () => {
    it('it should update the event', async () => {
      const event: EventDto = {
        'id': 'test-01',
        'name': 'Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };

      const ip = '91.246.250.204';

      await controller.create(event, ip);

      const updatedEvent: EventDto = {
        'id': 'test-01-updated',
        'name': 'Updated Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };

      const result_1 = await controller.update('test-01', updatedEvent, ip);
      expect(result_1).toBeDefined();

      const result_2 = await controller.findOne('test-01');      
      expect(result_2).toMatchObject({
        status: 'Error',
        message: 'Event with ID: "test-01" doesn\'t exists!'
      });

      const result_3 = await controller.findOne('test-01-updated');
      expect(result_3).toMatchObject(updatedEvent);
    });
  });

  describe('remove', () => {
    it('it should remove the event', async () => {
      const event: EventDto = {
        'id': 'test-01',
        'name': 'Test Name',
        'description': 'Nam nisl lacus, placerat vel condimentum ac, mollis a nunc. Mauris ac justo sed purus sodales mollis sit amet ac mauris.',
        'type': 'app',
        'priority': 8
      };

      const ip = '91.246.250.204';

      await controller.create(event, ip);

      const result_1 = await controller.remove('test-01');
      expect(result_1).toBeDefined();

      const result_2 = await controller.findOne('test-01');      
      expect(result_2).toMatchObject({
        status: 'Error',
        message: 'Event with ID: "test-01" doesn\'t exists!'
      });
    });
  });

  describe('urlFriendly', () => {
    it('it should convert ID to URL friendly', async () => {

      const result_1 = await controller.urlFriendly('id with spaces');
      expect(result_1).toBe('id-with-spaces');

      const result_2 = await controller.urlFriendly('špečial čharačters with spačes šđčžće');
      expect(result_2).toBe('special-characters-with-spaces-sczce');

      const result_3 = await controller.urlFriendly('Remove UPPER CASE');
      expect(result_3).toBe('remove-upper-case');

    });
  });

});
