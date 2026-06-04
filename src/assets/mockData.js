export const initialData = Array.from({ length: 50 }, (_, i) => {
  const names = ["Isagi Yoichi", "Laeonardo Decaprio", "Kaiser Brown"];
  const vehicles = ["Standard Dump Truck", "Mini Dump Trucks", "Low-Side Dump Trucks"];
  const vehicleNos = ["TLL-4679", "MJU-5210"];

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    vehicleNo: vehicleNos[i % 2],
    ownerName: names[i % 3],
    typeVehicle: vehicles[i % 3],
    status: i === 0 || i === 1 || i === 7 || i === 8 || i === 9 ? (i === 9 ? "Block" : "Active") : "InActive",
  };
});

export const clientInitialData = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const phones = ["0301-2345678", "0322-9876543"];
  const locations = ["Multan", "Overseas", "Lahore"];

  const name = names[i % 2];
  const phone = phones[i % 2];
  const location = locations[i % 3];

  const status =
    i === 0 || i === 1 || i === 7 || i === 8 || i === 9
      ? i === 9
        ? "Block"
        : "Active"
      : "InActive";

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    clientName: name,
    phoneNumber: phone,
    createdDate: "24-10-2025",
    location: location,
    status,
  };
});