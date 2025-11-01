import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "font-awesome/css/font-awesome.min.css";
import {
  CreateAttribute,
  CreateAttributeValue,
  GetAllAttributeData,
  GetAttributeDataByID,
  DeleteAttributeByID,
  UpdateAttributeinfo,
} from "../Redux/Features/AttributeServicesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "../Component/Common/Delete";

export const VariantAttributeManager = () => {
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);

  const [newAttribute, setNewAttribute] = useState({
    name: "",
    values: [],
    input_type: "",
  });
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [attributeDeleteID, setAttribteDeleteID] = useState(null); // Add this state

  const { AttributeValue, PersonalAttributedata, loading, error } = useSelector(
    (state) => state.AttributeOpration
  );

  useEffect(() => {
    dispatch(GetAllAttributeData());
  }, [dispatch]);

  // Add new attribute + values
  const handleAddAttribute = async () => {
    const attrName = newAttribute.name?.trim(); // safe check
    const inputtype = newAttribute.input_type?.trim();
    const filteredValues = newAttribute.values
      ?.map((v) => v?.trim())
      .filter((v) => v); // remove null/empty

    // 🚫 Guard clause → if name or values missing → stop
    if (
      !attrName ||
      !filteredValues ||
      filteredValues.length === 0 ||
      !inputtype
    ) {
      toast.error(
        "Please enter attribute name,inputtype and at least one value !"
      );
      return;
    }

    try {
      // 1️⃣ Create Attribute
      const createdAttr = await dispatch(
        CreateAttribute({
          name: newAttribute.name,
          input_type: newAttribute.input_type,
        })
      ).unwrap();

      // 3️⃣ Only call API if values exist
      if (createdAttr?.data?.id) {
        await dispatch(
          CreateAttributeValue({
            attribute_id: createdAttr.data.id,
            value: filteredValues, // ✅ safe array
          })
        ).unwrap();
      }

      resetForm();
      setFormVisible(false);
      // Refresh attributes
      dispatch(GetAllAttributeData());
      toast.success("Attribute and values created successfully!");
    } catch (error) {
      toast.error(
        error?.message ||
          error?.error ||
          error ||
          "Something went wrong while creating attribute"
      );
      resetForm();
      setFormVisible(false);
    }
  };

  // Add single value into newAttribute.values
  const handleAddValue = () => {
    const cleanValue = newValue.trim();
    if (cleanValue === "") return; // ❌ skip blank

    setNewAttribute({
      ...newAttribute,
      values: [...newAttribute.values, cleanValue], // ✅ always clean string
    });
    setNewValue("");
  };

  const handleEditAttribute = (id) => {
    // First dispatch the API call to get attribute data
    dispatch(GetAttributeDataByID(id));

    setEditingId(id);
    setIsEditMode(true);
    setFormVisible(true);
  };

  useEffect(() => {
    if (isEditMode && PersonalAttributedata) {
      const attribute = PersonalAttributedata;

      // Extract values from the attribute data
      const values =
        attribute.values && Array.isArray(attribute.values)
          ? attribute.values.map((v) => v.value)
          : [];

      setNewAttribute({
        name: attribute.name,
        values: values,
        input_type: attribute.input_type,
      });
    }
  }, [PersonalAttributedata, isEditMode]);

  const handleDeleteClick = (attributeid) => {
    setAttribteDeleteID(attributeid);
    setDeleteModalOpen(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setAttribteDeleteID(null);
  };
  const handleDeleteAttribute = async () => {
    try {
      await dispatch(DeleteAttributeByID(attributeDeleteID)).unwrap();

      toast.success("Attribute Delete successfully!");
      setFormVisible(false);
      setEditingId(null);
      setNewAttribute({ name: "", values: [], input_type: "" });
    } catch (error) {
      toast.error(error?.message || "Update failed");
    }
  };

  const handleUpdateAttribute = async () => {
    const attrName = newAttribute.name?.trim();
    const inputtype = newAttribute.input_type?.trim();
    const filteredValues = newAttribute.values
      ?.map((v) => v?.trim())
      .filter((v) => v);

    if (
      !attrName ||
      !filteredValues ||
      filteredValues.length === 0 ||
      !inputtype
    ) {
      toast.error("Please enter name, input type and at least one value!");
      return;
    }

    try {
      await dispatch(
        UpdateAttributeinfo({
          id: editingId,
          data: {
            name: attrName,
            input_type: inputtype,
            values: filteredValues,
          },
        })
      ).unwrap();

      // ✅ Log the API response

      toast.success("Attribute updated successfully!");
      setFormVisible(false);
      setEditingId(null);
      resetForm();
    } catch (error) {
      setFormVisible(false);
      setEditingId(null);
      resetForm();
      toast.error(error?.message || "Update failed");
    }
  };
  // Add this function to reset the form
  const resetForm = () => {
    setNewAttribute({
      name: "",
      values: [],
      input_type: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Variant Attributes</h1>
        <button
          className="px-5 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          onClick={() => {
            resetForm();
            setEditingId(null);
            setFormVisible(!formVisible);
          }}
        >
          <i className="fa fa-plus mr-2"></i>
          {formVisible ? "Close" : "Add Attribute"}
        </button>
      </div>

      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Attribute" : "Create Attribute"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attribute Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Color, Size, Material"
                value={newAttribute.name}
                onChange={(e) =>
                  setNewAttribute({
                    ...newAttribute,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* Values Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attribute Values
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add a value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddValue()}
                />
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
                  onClick={handleAddValue}
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {newAttribute.values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center shadow-sm"
                  >
                    {value}
                    <button
                      className="ml-2 text-gray-500 hover:text-red-600"
                      onClick={() =>
                        setNewAttribute({
                          ...newAttribute,
                          values: newAttribute.values.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                InputType
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Color, Size, Material"
                value={newAttribute.input_type}
                onChange={(e) =>
                  setNewAttribute({
                    ...newAttribute,
                    input_type: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex space-x-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md transition"
                onClick={editingId ? handleUpdateAttribute : handleAddAttribute}
              >
                {editingId ? "Save Changes" : "Save Attribute"}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                onClick={() => {
                  setFormVisible(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attributes List */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <i className="fa fa-list text-blue-600"></i> Attributes
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <i className="fa fa-exclamation-circle text-2xl mb-2"></i>
            <p>{error.message || "Unknown error"}</p>
          </div>
        ) : !AttributeValue?.data || AttributeValue.data.length === 0 ? (
          <div className="text-center py-8">
            <i className="fa fa-cubes text-3xl text-gray-400 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-600">
              No attributes yet
            </h3>
            <p className="text-gray-500">
              Create your first attribute to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                  <th className="px-4 py-3">Attribute Name</th>
                  <th className="px-4 py-3">Input Type</th>
                  <th className="px-4 py-3">Values</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {AttributeValue.data.map((attribute, index) => (
                  <tr
                    key={attribute.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Name */}
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {attribute.name}
                    </td>

                    {/* Input type */}
                    <td className="px-4 py-3">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {attribute.input_type}
                      </span>
                    </td>

                    {/* Values */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {attribute.values && attribute.values.length > 0 ? (
                          attribute.values.map((value, i) => (
                            <span
                              key={i}
                              className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs"
                            >
                              {value.value}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            No values
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center space-x-3">
                      <button
                        onClick={() => handleEditAttribute(attribute.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(attribute.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteAttribute}
        title="Delete Category"
        message={"Are you sure you want to delete this Attribute  ?"}
      />
    </div>
  );
};
