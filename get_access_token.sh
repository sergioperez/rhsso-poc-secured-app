curl http://sso.lan:8080/auth/realms/test/protocol/openid-connect/token \
	-d "client_id=my-demo-app" \
	-d "client_secret=cli_secret" \
	-d "username=test" \
	-d "password=test" \
	-d "grant_type=password"
