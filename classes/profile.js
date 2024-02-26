class userProfile {
  constructor({
    updated_at,
    username = "new user",
    contact_email = null,
    contact_phone = null,
    pic = null,
    sub_tier = null,
    setup_complete = false,
    pic_name = null,
  }) {
    this.updated_at = updated_at;
    this.username = username;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
    this.pic = pic;
    this.sub_tier = sub_tier;
    this.setup_complete = setup_complete;
    this.pic_name = pic_name;
  }
}
