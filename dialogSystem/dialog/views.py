from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


# Create your views here.
@csrf_exempt
def index(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = str(body['id'])
        if id == '-1':
            final_output = ''
            for item in body['finalOutput']:
                final_output = final_output + item + ' -> '
            print(final_output)
            id = '99'
        data = open('./dialogues.json').read()
        jsonData = json.loads(data)
        return JsonResponse(jsonData[id], content_type='application/json')
    else:
        return HttpResponse("Hello world.")
