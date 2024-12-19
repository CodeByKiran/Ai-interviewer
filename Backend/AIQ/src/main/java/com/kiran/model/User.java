package com.kiran.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userid;
	
	@Column(name = "username" , nullable = false , unique = true)
	private String username;
	
	@Column(name = "email" , nullable = false , unique = true)
	private String email;
	
	@Column(name = "password" , nullable = false , unique = false)
	private String password;

	public long getId() {
		return userid;
	}

	public void setId(long id) {
		this.userid = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}