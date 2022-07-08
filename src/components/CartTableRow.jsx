import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Close} from '@styled-icons/material/Close';

import {getValidNumberInRange} from '../utils/validationUtils';
import {removeItem, modifyItem} from '../store/cartSlice';

import NumberInput from './NumberInput';
import Button from './Button';
import {
    StyledCartTableTextAlignCenterCell, 
    StyledCartTableTextAlignRightCell,
} from './CartTable';


const StyledCartTableItemImg = styled.img`
    max-width: 100px;
`;

const CartTableRow = ({quantity, item, editable, showUnitPriceColumn}) => {
    const [amount, setAmount] = useState(quantity);
    const dispatch = useDispatch();
    const handleRemoveItem = () => {
        dispatch(removeItem({id: item.id}));
    };
    
    const handleModifyItem = (event) => {
        setAmount(event.target.value);
    };

    const handleModifyItemOnBlur = (event) => {
        const newValue = getValidNumberInRange(
            event.target.value, 1, 1, item.stock);
        setAmount(newValue);
        dispatch(modifyItem({item: item, amount: newValue}));
    }

    return (
        <tr key={item.id}>
            {editable
                ?
                <td>
                    <Button
                        onClick={() => handleRemoveItem()}
                    >
                        <Close 
                            size={18}
                        />
                    </Button>
                </td>
                :
                null
            }
            <td>
                <StyledCartTableItemImg
                    src={item.mainimage.url}
                />
            </td>
            <td>
                {item.name}
            </td>
            {showUnitPriceColumn
                ?
                <StyledCartTableTextAlignCenterCell>
                $ {item.price}
                </StyledCartTableTextAlignCenterCell>
                :
                null
            }
            <StyledCartTableTextAlignCenterCell>
                {editable
                    ?
                    <NumberInput
                        value={amount}
                        min={1}
                        max={item.stock}
                        onChange={handleModifyItem}
                        onBlur={handleModifyItemOnBlur}
                    />
                    :
                    <span>
                        {quantity}
                    </span>
                }
            </StyledCartTableTextAlignCenterCell>
            <StyledCartTableTextAlignRightCell>
                $ {quantity * item.price}
            </StyledCartTableTextAlignRightCell>
        </tr>
    );
};

CartTableRow.propTypes = {
    editable: PropTypes.bool,
    showUnitPriceColumn: PropTypes.bool,
    quantity: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    item: PropTypes.object.isRequired,
};

CartTableRow.defaultProps = {
    editable: false,
    showUnitPriceColumn: true,
};


export default CartTableRow;