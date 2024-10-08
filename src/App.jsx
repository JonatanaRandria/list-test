import React, { useState } from "react";
import { Table, Select, Input, Button } from "antd";

const { Option } = Select;

const App = () => {
  // Données initiales des personnes et des éléments du dropdown
  const initialPersons = [
    { name: "Personne 1" },
    { name: "Personne 2" },
    { name: "Personne 3" },
  ];

  const dropdownOptions = [
    "Arme 1",
    "Arme 2",
    "Arme 3",
    "Arme 4",
  ];


  const [persons, setPersons] = useState(initialPersons);
  const [newPersonName, setNewPersonName] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [availableOptions, setAvailableOptions] = useState(dropdownOptions);


  const handleDropdownChange = (value, personName) => {
    setSelectedItems((prev) => ({
      ...prev,
      [personName]: value,
    }));
    setAvailableOptions(availableOptions.filter((item) => item !== value));
  };


  const handleAddPerson = () => {
    if (newPersonName && !persons.find((person) => person.name === newPersonName)) {
      setPersons([...persons, { name: newPersonName }]);
      setNewPersonName("");
    }
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sélectionner",
      key: "dropdown",
      render: (text, record) => (
        <Select
          style={{ width: 120 }}
          placeholder="Sélectionner"
          onChange={(value) => handleDropdownChange(value, record.name)}
          disabled={!!selectedItems[record.name]}
        >
          {availableOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  // Colonnes du deuxième tableau
  const selectedColumns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Élément Sélectionné",
      dataIndex: "selected",
      key: "selected",
    },
  ];

  // Données pour le deuxième tableau (éléments sélectionnés)
  const selectedData = Object.keys(selectedItems).map((personName) => ({
    key: personName,
    name: personName,
    selected: selectedItems[personName],
  }));

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
      {/* Premier tableau et ajout de personne */}
      <div style={{ width: "45%" }}>
        <h3>Tableau des personnes</h3>
        <Table
          dataSource={persons}
          columns={columns}
          rowKey="name"
          pagination={false}
        />
        {/* Input et bouton pour ajouter une personne */}
        <Input
          placeholder="Nom de la personne"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          style={{ marginBottom: "10px", width: "70%" }}
        />
        <Button
          type="primary"
          onClick={handleAddPerson}
        >
          Enregistrer
        </Button>
      </div>

      {/* Deuxième tableau */}
      <div style={{ width: "45%" }}>
        <h3>Éléments sélectionnés</h3>
        <Table
          dataSource={selectedData}
          columns={selectedColumns}
          rowKey="name"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default App;
