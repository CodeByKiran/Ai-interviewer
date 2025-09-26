package com.kiran.DTO;

import java.util.List;

public class ResumeData {
    private String name;
    private String email;
    private String phone;
    private String linkedIn;
    private String github;
    private List<String> education;
    private List<String> projects;
    private List<String> experience;
    private List<String> skills;
    private List<String> certifications;
    private List<String> technologies;

    public ResumeData() { }

    public ResumeData(String name, String email, String phone, String linkedIn, String github,
                      List<String> education, List<String> projects, List<String> experience,
                      List<String> skills, List<String> certifications, List<String> technologies) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.linkedIn = linkedIn;
        this.github = github;
        this.education = education;
        this.projects = projects;
        this.experience = experience;
        this.skills = skills;
        this.certifications = certifications;
        this.technologies = technologies;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLinkedIn() {
		return linkedIn;
	}

	public void setLinkedIn(String linkedIn) {
		this.linkedIn = linkedIn;
	}

	public String getGithub() {
		return github;
	}

	public void setGithub(String github) {
		this.github = github;
	}

	public List<String> getEducation() {
		return education;
	}

	public void setEducation(List<String> education) {
		this.education = education;
	}

	public List<String> getProjects() {
		return projects;
	}

	public void setProjects(List<String> projects) {
		this.projects = projects;
	}

	public List<String> getExperience() {
		return experience;
	}

	public void setExperience(List<String> experience) {
		this.experience = experience;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
	}

	public List<String> getCertifications() {
		return certifications;
	}

	public void setCertifications(List<String> certifications) {
		this.certifications = certifications;
	}

	public List<String> getTechnologies() {
		return technologies;
	}

	public void setTechnologies(List<String> technologies) {
		this.technologies = technologies;
	}

}
