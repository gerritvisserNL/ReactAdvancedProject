import { Select } from "@chakra-ui/react";

export const CategoryFilter = ({ categories, setSelectedCategory }) => {
  const handleChange = (event) => {
    setSelectedCategory(Number(event.target.value));
  };

  return (
    <Select placeholder="Select a category" onChange={handleChange}>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
