import { View, Text, TouchableWithoutFeedback } from "react-native";
import { GeneralForm } from "../../components/accountSetup";
import { SetupStyle } from "../../styles/Auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { AccountSetupLayout } from "../../layouts";
import SetupContext from "../../contexts/SetupContext";
import { Button } from "../../components/common";

interface Prop {
    navigation?: any,
}

export default function AccountSetup({ navigation }: Prop): any {
    const { fullName, username, gender, cpf, phone, accountType } = useContext(SetupContext);

    const [btnActive, setBtnActive] = useState<boolean>(true);

    useEffect(() => {
        if (fullName == "" || username == "" || cpf == "" || phone == "" || gender == "" || accountType == "") {
            setBtnActive(true);
            return;
        }

        setBtnActive(false);
    }, [fullName, username, cpf, phone, gender, accountType]);

    const handleBtnPress = async (): Promise<void | null> => {
        console.log(fullName);
        ((accountType == "Rider") ? navigation.navigate('Dob') : null)
    }

    return (
        <AccountSetupLayout navigateBack={navigation.pop}>
            {/**User Profile Picture */}
            <View style={SetupStyle.profileContainer}>
                <TouchableWithoutFeedback>
                    <MaterialIcons name="edit" size={20} color={'#FFD763'} style={SetupStyle.editBtn} />
                </TouchableWithoutFeedback>
            </View>

            {/**Forms To fill out */}
            <GeneralForm />

            <Button
                style={SetupStyle.button}
                disabled={btnActive}
                onPress={() => handleBtnPress()}
            >
                {(accountType == "Rider") ? 'Next' : 'Continue'}
            </Button>
        </AccountSetupLayout>
    )
}
