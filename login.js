import React, { useState, useEffect, useCallback } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Text,
    SafeAreaView, ScrollView, ImageBackground, Dimensions,
    TextInput
} from 'react-native';
import { Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import appleAuth, {
    AppleButton
} from '@invertase/react-native-apple-authentication';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import { actLoginWithFacebook, actionLoginWithGoogle, actLoginWithApple, actLoginEmail } from '../../redux/action/user_info';
import { user_services } from '../../redux/services';
import { fontMaker, fontStyles } from '../../utils/fonts';
import { helpers } from '../../utils/helpers';
import { images } from '../../utils/images';
import { COLOR } from '../../handle/Constant';

const isSupported = appleAuth.isSupported;

const { height, width } = Dimensions.get('window');

const Login = (props) => {

    const dispatch = useDispatch();
    const { navigation } = props;

    const [email, setMail] = useState('');
    const [password, setPass] = useState('');
    const [isLogin, setLoginType] = useState(true);
    const [show, setShow] = useState(false);

    const handleSubmit = useCallback(() => {
        if(isLogin) {
            console.log('-===s=s')
            dispatch(actLoginEmail({email, password}));
        } else {

        }
    }, [isLogin, email, password])
    return (
        <View style={{ flex: 1, backgroundColor: '#FECD2F' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    flex: 1, justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: height * 0.09,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 50,
                    borderBottomRightRadius: 50,
                }}>
                    <ScrollView>
                        <View style={{ width: Dimensions.get('window').width - 50, flex: 1, height: height * 0.7, }}>
                            <LottieView
                                autoPlay
                                loop
                                style={{
                                    // width: 260, 
                                    // backgroundColor: 'red',
                                    height: height * 0.25,
                                    alignSelf: 'center'
                                }}
                                source={require('../../public/learning_gif.json')}
                            />
                            <View style={{ justifyContent: 'space-around', flex: 1 }}>
                                <Animatable.View animation='slideInLeft' style={styles.inputWapper}>
                                    <TextInput value={email} onChangeText={setMail} placeholder="Email" style={styles.input} autoCompleteType="email" keyboardType="email-address" />
                                </Animatable.View>
                                <Animatable.View delay={200} animation='slideInRight' style={[styles.inputWapper, { flexDirection: 'row' }]}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput value={password} onChangeText={setPass} placeholder="Password" style={styles.input} secureTextEntry={show} />
                                    </View>
                                    <TouchableOpacity onPress={() => setShow(!show)} style={{ alignSelf: 'center' }}>
                                        <Icon name={show ? "eye" : "eye-off"} style={{ fontSize: 22, color: '#666' }} />
                                    </TouchableOpacity>
                                </Animatable.View>
                                {/* login btn */}
                                <Animatable.View animation='bounceInUp' delay={400}>
                                    <TouchableOpacity onPress={handleSubmit} style={{ ...styles.loginBtn, ...styles.shadow, backgroundColor: '#FECD2F', borderColor: '#eee', borderWidth: 1 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.txtBtn, { color: '#444' }]}>{isLogin ? "Đăng nhập": "Đăng ký"}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: 40, borderRadius: 40, backgroundColor: '#fff' }}>
                                            <Icon name='right' type="AntDesign" style={{ color: '#232323', fontSize: 18, }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setLoginType(!isLogin)} style={{ marginTop: 15, alignSelf: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 5, paddingHorizontal: 10 }}>
                                        <Text>{isLogin ? "Tạo tài khoản mới" : "Đã có tài khoản"}</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>


                        </View>
                    </ScrollView>
                    <View style={[styles.triangleCorner, {}]}>

                    </View>
                </View>

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    loginBtn: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: helpers.isTablet ? 380 : '100%',
        padding: 7,
        borderRadius: 50, marginTop: 20
    },
    appleButton: {
        width: helpers.isTablet ? 380 : '100%',
        alignSelf: 'center',
        paddingVertical: 25
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 7 },
    },
    txtBtn: { color: 'white', fontWeight: '500', marginLeft: 10, fontSize: 16, ...fontMaker({ weight: fontStyles.SemiBold }) },
    shadowStyle: { shadowColor: 'black', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.6, elevation: 2 },
    textBtn: { color: 'white', marginLeft: 8, ...fontMaker({ weight: 'Regular' }) },
    socialBtn: { justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 140, height: 40, borderRadius: 5 },
    name: { alignItems: 'center', marginTop: 15, fontSize: 16, ...fontMaker({ weight: 'Bold' }), alignSelf: 'center', textAlign: 'center', paddingHorizontal: 20, lineHeight: 30 },

    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: width - 35,
        borderTopWidth: 20,
        // marginTop: 20,
        position: 'absolute',
        top: '100%',
        borderRightColor: "transparent",
        borderTopColor: "#fff",
        alignSelf: 'flex-start'

    },
    inputWapper: {
        height: 50, width: '100%', borderBottomWidth: 1,
        borderColor: '#dedede', paddingHorizontal: 15,
        // marginBottom: 50

    },
    input: {
        height: 50, width: '100%', fontSize: 20
    }
});

export default Login;

