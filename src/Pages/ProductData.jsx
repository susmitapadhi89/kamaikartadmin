import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Switch,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Pagination,
  Chip,
} from "@mui/material";
import {
  Search,
  Delete,
  Edit,
  Visibility,
  Refresh,
  FileDownload,
  Add,
} from "@mui/icons-material";
import { ListProduct } from "../Component/Tableview/Showdata";
import { useNavigate } from "react-router-dom";

export const ProductData = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    subSubCategory: "",
  });

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Category data structure
  const categoryData = {
    Cat1: {
      name: "Automotive",
      subCategories: {
        SubCat1: "Interior Accessories",
        SubCat2: "Exterior Accessories",
      },
    },
    Cat2: {
      name: "Electronics",
      subCategories: {
        SubCat3: "Computers",
        SubCat4: "Mobile Accessories",
      },
    },
  };

  const subSubCategories = {
    SubCat1: ["Seat Covers", "Floor Mats"],
    SubCat2: ["Car Covers", "Hood Protectors"],
    SubCat3: ["Laptops", "Desktops"],
    SubCat4: ["Phone Cases", "Screen Protectors"],
  };

  //table data coloumns name
  const ProductDataColumns = [
    { key: "id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "name", label: " Name" },
    { key: "type", label: "Category Name" },

    { key: "price", label: "Unit Price" },
    { key: "stock", label: "Stutus" },
  ];

  // Mock data (replace with API call)
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Waterproof Seat Protector",
        image: "https://via.placeholder.com/40",
        type: "Physical",
        price: 25.0,

        stock: "Limited",
      },
      {
        id: 2,
        name: "HP BOSS CRATE ENGINE",
        image: "https://via.placeholder.com/40",
        type: "Physical",
        price: 2500.0,

        stock: "In Stock",
      },
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    // Reset dependent filters when parent category changes
    if (field === "category") {
      setFilters({
        ...filters,
        category: value,
        subCategory: "",
        subSubCategory: "",
      });
    } else if (field === "subCategory") {
      setFilters({
        ...filters,
        subCategory: value,
        subSubCategory: "",
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      subCategory: "",
      subSubCategory: "",
    });
    setSearch("");
    setPage(1);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddProduct = () => {
    return navigate("/Product/Add");
  };

  return (
    <Box className="min-h-screen p-6">
      {" "}
      {/* Header */}
      <Box className="flex items-center gap-2 mb-6">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Product List
        </Typography>
        <Chip label={products.length} color="primary" size="small" />
      </Box>
      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          Filter Products
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          <Select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            displayEmpty
            size="small"
            fullWidth
          >
            <MenuItem value="">Select Category</MenuItem>
            {Object.entries(categoryData).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={filters.subCategory}
            onChange={(e) => handleFilterChange("subCategory", e.target.value)}
            displayEmpty
            size="small"
            fullWidth
            disabled={!filters.category}
          >
            <MenuItem value="">Select Sub Category</MenuItem>
            {filters.category &&
              Object.entries(categoryData[filters.category].subCategories).map(
                ([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                )
              )}
          </Select>

          <Select
            value={filters.subSubCategory}
            onChange={(e) =>
              handleFilterChange("subSubCategory", e.target.value)
            }
            displayEmpty
            size="small"
            fullWidth
            disabled={!filters.subCategory}
          >
            <MenuItem value="">Select Sub-Sub Category</MenuItem>
            {filters.subCategory &&
              subSubCategories[filters.subCategory]?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </Box>

        <Box className="flex items-center justify-end  gap-2 mt-6">
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button variant="contained">Apply Filters</Button>
        </Box>
      </Paper>
      <Divider sx={{ my: 3 }} />
      {/* Search and Actions */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search by Product Name"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "flex-end" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      {/* Product Table */}
      <ListProduct columns={ProductDataColumns} data={paginatedProducts} />{" "}
      {/* Pagination */}
      <Box className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};
