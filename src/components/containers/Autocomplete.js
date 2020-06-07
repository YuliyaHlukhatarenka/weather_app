import React from 'react';
import PropTypes from 'prop-types';

const Autocomplete = ({ onSubmit }) => {
    const localStorageData = localStorage.getItem('cities');
    const [options, setOptions] = React.useState(localStorageData ? localStorageData.split(',') : []);
    const [activeOption, setActiveOption] = React.useState(-1);
    const [filteredOptions, setFilteredOptions] = React.useState([]);
    const [showOptions, setShowOptions] = React.useState(false);
    const [userInput, setUserInput] = React.useState('');

    const onChange = (e) => {
        if ((e.currentTarget.value !== '') && (e.currentTarget.value !== undefined) && Array.isArray(options)) {
            setFilteredOptions(options.filter((optionName) => optionName.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1));
        } else {
            setFilteredOptions([]);
        }
        setActiveOption(-1);
        setShowOptions(true);
        setUserInput(e.currentTarget.value);
    };

    const onClick = (e) => {
        setActiveOption(0);
        setFilteredOptions([]);
        setShowOptions(false);
        setUserInput(e.currentTarget.innerText);
        const input = document.getElementById('search-input');
        input.focus();
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (userInput !== "") {
                if (activeOption === -1) {
                    setUserInput(e.currentTarget.value);
                    const localStorageData = localStorage.getItem('cities') || '';
                    if (localStorageData.indexOf(userInput) === -1) {
                        localStorage.setItem('cities', `${localStorageData},${userInput}`);
                        setOptions([...options, userInput])
                    }
                } else {
                    setActiveOption(-1);
                    setUserInput(filteredOptions[activeOption]);
                }
                setShowOptions(false);
                onSubmit(userInput);
            }

        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            setActiveOption(activeOption - 1);
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            setActiveOption(activeOption + 1);
        }
    };

    return (
        <React.Fragment>
            <div className="search-section">
                <div className="search-section__container">
                    <input
                        id="search-input"
                        type="text"
                        className="search-section__input"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput || ''}
                        autoFocus={true}
                        placeholder="Search..."
                    />
                    <input type="submit" value="" className="search-btn" onClick={() => onSubmit(userInput)} />
                    {(showOptions && userInput) &&
                        <div className="options-container">
                            <ul className="options">
                                {filteredOptions.map((optionName, index) =>
                                    <li className={index === activeOption ? 'option-active' : ''} key={optionName} onClick={onClick}>
                                        {optionName}
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}


export default Autocomplete;

Autocomplete.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
