const Equipment = require("../../models/Equipment");

module.exports.get_all_equipments = async (req, res) => {
  try {
    const existEquipments = await Equipment.find();
    if (!existEquipments) {
      res.send(404).json({ status: "Equipment Not found" });
    }

    res.status(200).json(existEquipments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.get_one_equipment = async (req, res) => {
  const equipmentId = req.params.equipmentId;
  try {
    const existEquipments = await Equipment.findById({ _id: equipmentId });

    if (!existEquipments) {
      res.status(404).json({ status: "Equipment not found" });
    }

    res.status(200).json(existEquipments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.create_equipment = async (req, res) => {
  const { name, type, quantity, description, condition } = req.body;

  try {
    const newEquipment = await Equipment.create({
      name,
      type,
      quantity,
      description,
      condition,
    });

    if (!newEquipment) {
      res.status(404).json({ status: "Equipment not found" });
    }

    res.status(200).json(newEquipment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.update_equipments = async (req, res) => {
  const equipmentId = req.params.equipmentId;
  const updateInfo = req.body;

  try {
    const existEquipments = await Equipment.findById({ _id: equipmentId });

    if (!existEquipments) {
      res.status(404).json({ status: "Equipment not found" });
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      { _id: equipmentId },
      { $set: updateInfo },
      {
        new: true,
      }
    );

    res.status(200).json(updatedEquipment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.delete_equipments = async (req, res) => {
  const equipmentId = req.params.equipmentId;

  try {
    const existEquipments = await Equipment.findById({ _id: equipmentId });

    if (!existEquipments) {
      res.status(404).json({ status: "Equipment not found" });
    }
    await Equipment.findByIdAndDelete({ _id: equipmentId });

    res.status(200).json({ status: "Equipment deleted success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
