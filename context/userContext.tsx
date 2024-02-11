


export type userType = {
    uid: String, // firebase UID. we use this instead of the mongoDB _id
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String,
	profile: String,
	bio: String,
	pronouns: String,
}

export const emptyUser: userType = {
	uid: "", 
	firstName: "",
	lastName: "",
	emailAddress: "",
	password: "",
	profile: "",
	bio: "",
	pronouns: "",
}