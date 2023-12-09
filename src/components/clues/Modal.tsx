import {TextBlock} from "@/components/TextBlock";
import './Modal.css';
import ModalContent from "@/components/clues/ModalContent";

export default function Modal({ modal, toggleModal, cssStyle }: { modal: boolean, toggleModal: () => void, cssStyle?: React.CSSProperties }) {

    // const closeOnOverlayClick = (e: any) => {
    //     if (e.target.className === 'overlay') {
    //         toggleModal();
    //     }
    // }

    return (
        <>
            {modal ?
            <div className={"modal"} >
                <div className={"overlay"}>
                    <TextBlock header={"How to play?"} showButton={true} onClick={toggleModal} cssStyle={cssStyle}>
                        <ModalContent />
                    </TextBlock>
                </div>
            </div> : null}
        </>
    );
}