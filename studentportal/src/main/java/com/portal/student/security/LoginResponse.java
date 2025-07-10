package com.portal.student.security;

public class LoginResponse {
	private String token;
	private String username;

	
	public LoginResponse(String token, String username) {
		super();
		this.token = token;
		this.username = username;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "LoginResponse [token=" + token + ", username=" + username + "]";
	}

}
