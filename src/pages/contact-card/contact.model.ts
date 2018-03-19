export class ContactModel {
	images: Array<string> = [];
	name: string;
	rating: number;
	email: string;
  phone: string;
  website: string;
  address: string;

	constructor() {
    this.images = [
			'./assets/images/maps/event2.jpg',
			'./assets/images/maps/event3.jpg',
			'./assets/images/maps/event6.png',
			'./assets/images/maps/charity4.jpg'
		];
		this.name = "Quartet community foundation";
		this.rating = 4;
		this.email = "info@quartetcf.org.uk";
	  this.phone = "555-555-555";
	  this.website = "http://quartetcf.org.uk/";
	  this.address = "Prince Street,Bristol";
  }
}
