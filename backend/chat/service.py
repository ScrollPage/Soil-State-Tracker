from django.conf import settings

from client.models import Client

def send_mass_notifications(instance, channel_name, event, exclude_manager=False):
	map(
		lambda manager: settings.pusher_client.trigger(
			f'{channel_name}{manager.id}', 
			event,
			{'chat': instance.id, 'user_name': instance.user_name} if event == 'new_chat' \
				else {'chat': instance.id}
		),
		Client.objects.filter(is_staff=True) if not exclude_manager else \
			Client.objects.filter(is_staff=True).exclude(id=instance.manager.id)
	)