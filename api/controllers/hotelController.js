import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const delateHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};
// export const getAllHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const getAllHotels = await Hotel.find({
//       ...others,
//       cheapestPrice: { $gt: min || 1, $lt: max || 999 },
//     }).limit(req.query.limit);
//     res.status(200).json(getAllHotels);
//   } catch (err) {
//     next(err);
//   }
// };

export const getAllHotels = async (req, res, next) => {
  const { min, max, limit, featured, ...others } = req.query;
  const minPrice = parseFloat(min) || 1;
  const maxPrice = parseFloat(max) || 999;
  const limitResults = parseInt(limit, 10) || 10; // Default limit if not provided
  const isFeatured = featured === "true"; // Convert featured to boolean

  console.log("Query Parameters:", req.query);
  console.log("Parsed minPrice:", minPrice);
  console.log("Parsed maxPrice:", maxPrice);
  console.log("Other Conditions:", others);

  const filterConditions = {
    ...others,
    cheapestPrice: { $gt: minPrice, $lt: maxPrice },
    ...(featured !== undefined && { featured: isFeatured }), // Add featured condition only if it's provided
  };

  console.log("Final Filter Conditions:", filterConditions);

  try {
    const getAllHotels = await Hotel.find(filterConditions).limit(limitResults);
    console.log("Query Result:", getAllHotels);

    res.status(200).json(getAllHotels);
  } catch (err) {
    console.error("Error fetching hotels:", err);
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
