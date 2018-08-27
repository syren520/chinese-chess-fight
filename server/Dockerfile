FROM python:3
COPY server.py /
COPY demo_mysql.py /
COPY requirements.txt /
RUN pip install -r requirements.txt
CMD [ "python", "-u", "server.py" ]