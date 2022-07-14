FROM postgres:11.7-alpine

# Copy in the load-extensions script
COPY db_load/load-extensions.sh /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/load-extensions.sh