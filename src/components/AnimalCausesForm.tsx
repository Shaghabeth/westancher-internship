import { useState, useEffect } from 'react';

const AnimalCausesForm = () => {
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [customChoices, setCustomChoices] = useState<Array<{id: string, label: string}>>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChoiceLabel, setNewChoiceLabel] = useState('');

  const baseAnimalOptions = [
    { id: 'A', label: 'All Animal Causes' },
    { id: 'B', label: 'Elephants' },
    { id: 'C', label: 'Giraffes' },
    { id: 'D', label: 'Manatees' },
    { id: 'E', label: 'Pandas' },
    { id: 'F', label: 'Penguins' },
    { id: 'G', label: 'Polar Bears' },
    { id: 'H', label: 'Primates' },
    { id: 'I', label: 'Raptors' },
    { id: 'J', label: 'Rhinos' },
    { id: 'K', label: 'Sea Turtles' },
    { id: 'L', label: 'Sharks' },
    { id: 'M', label: 'Sloths' },
    { id: 'N', label: 'Whales & Dolphins' },
    { id: 'O', label: 'Wild Cats' }
  ];

  const animalOptions = [...baseAnimalOptions, ...customChoices];

  // Real-time logging of selections
  useEffect(() => {
    console.log('Selected Causes Updated:', selectedCauses);
    
    // You could also send this to an API in real-time
    // fetch('/api/update-selections', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ selections: selectedCauses }) 
    // });
  }, [selectedCauses]);

  const toggleSelection = (optionId: string) => {
    setSelectedCauses(prev => {
      const newSelection = prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      
      // Real-time callback - you can customize this
      onSelectionChange(newSelection);
      return newSelection;
    });
  };

  const onSelectionChange = (selections: string[]) => {
    // Real-time handler - customize this for your needs
    console.log('Real-time selection change:', selections);
    
    // Example: Send to parent component, API, or local storage
    localStorage.setItem('animalCauses', JSON.stringify(selections));
    
    // Example: Trigger real-time updates
    if (selections.length > 0) {
      console.log(`User has selected ${selections.length} animal cause(s)`);
    }
  };

  const addCustomChoice = () => {
    if (newChoiceLabel.trim()) {
      const nextId = String.fromCharCode(79 + customChoices.length + 1); // Start from P
      const newChoice = {
        id: nextId,
        label: newChoiceLabel.trim()
      };
      
      setCustomChoices(prev => [...prev, newChoice]);
      setNewChoiceLabel('');
      setShowAddForm(false);
      
      console.log('Added custom choice:', newChoice);
    }
  };

  const removeCustomChoice = (choiceId: string) => {
    setCustomChoices(prev => prev.filter(choice => choice.id !== choiceId));
    setSelectedCauses(prev => prev.filter(id => id !== choiceId));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-lg mr-4">1 →</span>
          <h1 className="text-4xl font-bold text-black">
            Which Animal Causes do you want to support?
          </h1>
        </div>
        
        <p className="text-gray-500 text-lg ml-12">
          Environmental and Human Causes are next.
        </p>
      </div>

      <div className="ml-12">
        <p className="text-gray-700 text-base mb-6">
          Choose as many as you like
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {animalOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSelection(option.id)}
              className={`
                flex items-center px-4 py-3 rounded-lg border-2 text-left transition-all duration-200 group
                ${selectedCauses.includes(option.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }
              `}
            >
              <span className={`
                inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold mr-3 flex-shrink-0
                ${selectedCauses.includes(option.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {option.id}
              </span>
              <span className="text-base font-medium flex-1">
                {option.label}
              </span>
              {customChoices.some(choice => choice.id === option.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCustomChoice(option.id);
                  }}
                  className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                >
                  ×
                </button>
              )}
            </button>
          ))}
        </div>

        <div className="mb-4">
          {!showAddForm ? (
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-gray-600 text-base underline hover:text-gray-800 transition-colors"
            >
              Add choice
            </button>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={newChoiceLabel}
                onChange={(e) => setNewChoiceLabel(e.target.value)}
                placeholder="Enter animal cause name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addCustomChoice()}
                autoFocus
              />
              <button
                onClick={addCustomChoice}
                disabled={!newChoiceLabel.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewChoiceLabel('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedCauses.length > 0 && (
        <div className="mt-8 ml-12">
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Selected Causes ({selectedCauses.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCauses.map(id => {
                const option = animalOptions.find(opt => opt.id === id);
                return (
                  <span 
                    key={id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    <span className="font-bold mr-1">{id}</span>
                    {option?.label}
                  </span>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-800 font-medium">Live Status</span>
            </div>
            <p className="text-green-700 text-sm">
              Your selections are being saved in real-time. 
              Check the browser console to see live updates.
            </p>
          </div>
        </div>
      )}

      {customChoices.length > 0 && (
        <div className="mt-4 ml-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Custom Choices Added:</h4>
          <div className="flex flex-wrap gap-2">
            {customChoices.map(choice => (
              <span key={choice.id} className="inline-flex items-center px-2 py-1 rounded text-sm bg-yellow-200 text-yellow-800">
                <span className="font-bold mr-1">{choice.id}</span>
                {choice.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalCausesForm;