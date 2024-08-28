import SAVE_BTN_STATUS from '../constants/common/saveBtn.constant';
import { TSaveBtnStatusValue } from '../types/common/saveBtn.type';
import { TColors } from '../types/colors.type';
import useColorApp from './useColorApp';

const useSaveBtn = ({
	isNewItem,
	isSaving,
	isDirty,
}: {
	isNewItem: boolean;
	isSaving: boolean;
	isDirty: boolean;
}) => {
	const { colorApp } = useColorApp();
	const textFn = () => {
		if (isSaving) return SAVE_BTN_STATUS.GUARDANDO;
		if (!isSaving && !isNewItem && !isDirty) return SAVE_BTN_STATUS.GUARDADO;
		return SAVE_BTN_STATUS.GUARDAR;
	};
	const saveBtnText: TSaveBtnStatusValue = textFn();
	

	const colorFn = () => {
		if (isSaving) return colorApp;
		if (!isSaving && isNewItem) return 'emerald';
		if (!isSaving && !isNewItem && !isDirty) return colorApp;
		return colorApp;
	};
	const saveBtnColor: TColors | string = colorFn();

	const saveBtnDisable: boolean = !isNewItem && !isDirty;

	return { saveBtnText, saveBtnColor, saveBtnDisable };
};
export default useSaveBtn;
