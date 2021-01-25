import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Clipboard, Alert } from 'react-native';
import { convertRupiah, convertDate, clipboard } from '../page/components/converFunction'

const ScreenHeight = Dimensions.get("window").height
const ScreenWidth = Dimensions.get("window").width

function detailTrans({ navigation }) {
    const [detailData, setdetailData] = useState(navigation.getParam('data'))
    const [detailModal, setDetailModal] = useState(false)
    const senderBank = detailData.sender_bank.toUpperCase()
    const beneficiaryBank = detailData.beneficiary_bank.toUpperCase()
    const name = detailData.beneficiary_name.toUpperCase()
    const accNumber = detailData.account_number
    const amount = convertRupiah(detailData.amount)
    const remark = detailData.remark
    const uniqueCode = detailData.unique_code
    const createdAt = convertDate(detailData.created_at.substring(0, 10))

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.transContainer}>
                    <Text style={styles.transTitle}>{`ID TRANSAKSI : #${detailData.id}`}</Text>
                    <TouchableOpacity onPress={() => clipboard(detailData.id)}>
                        <Image source={require('../images/copy.png')} resizeMode='cover' style={styles.clipBoard} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.detailContainer} onPress={() => setDetailModal(!detailModal)}>
                    <Text style={styles.detailTitle}>DETAIL TRANSAKSI</Text>
                    <Text style={[styles.detailTitle, { color: detailModal === false ? 'green' : 'red', marginRight: 20 }]}>{detailModal === false ? 'Buka' : 'Tutup'}</Text>
                </TouchableOpacity>

                {
                    detailModal === true ?
                        <View style={styles.detailValueContainer}>
                            <Text style={styles.bankValue}>{`${senderBank} ➔ ${beneficiaryBank}`}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                                <View style={styles.otherDescColumn}>
                                    <Text style={styles.otherDescValue}>{name}</Text>
                                    <Text style={styles.otherDescValue}>{accNumber}</Text>
                                </View>
                                <View style={styles.otherDescColumn}>
                                    <Text style={styles.otherDescValue}>NOMINAL</Text>
                                    <Text style={styles.otherDescValue}>{`Rp.${amount}`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                                <View style={styles.otherDescColumn}>
                                    <Text style={styles.otherDescValue}>BERITA TRANSFER</Text>
                                    <Text style={styles.otherDescValue}>{remark}</Text>
                                </View>
                                <View style={styles.otherDescColumn}>
                                    <Text style={styles.otherDescValue}>KODE UNIK</Text>
                                    <Text style={styles.otherDescValue}>{uniqueCode}</Text>
                                </View>
                            </View>
                            <View style={[styles.otherDescColumn, { marginVertical: 15 }]}>
                                <Text style={styles.otherDescValue}>WAKTU DIBUAT</Text>
                                <Text style={styles.otherDescValue}>{createdAt}</Text>
                            </View>
                        </View>
                        :
                        <View></View>
                }
            </View>
        </View >
    );

}

detailTrans.navigationOptions = ({ navigation }) => {
    const name = 'Detail Transaction';
    return {
        title: name,
        headerTintColor: 'black',
        headerTitleStyle: {
            fontSize: 20,
            color: 'black',
            fontWeight: '200',
        },
    };
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(125,125,125,0.3)',
        height: ScreenHeight,
        width: ScreenWidth
    },

    transContainer: {
        width: ScreenWidth,
        height: ScreenHeight * 12 / 100,
        borderBottomWidth: 0.2,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },

    transTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 15
    },

    detailContainer: {
        width: ScreenWidth,
        height: ScreenHeight * 12 / 100,
        borderBottomWidth: 0.2,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 15
    },

    detailValueContainer: {
        width: ScreenWidth,
        justifyContent: 'center',
        marginVertical: 15,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    bankValue: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingBottom: 5
    },

    otherDescColumn: {
        flexDirection: 'column',
        width: ScreenWidth * 50 / 100
    },

    otherDescValue: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        marginRight: 20
    },

    clipBoard: {
        width: ScreenWidth * 5 / 100,
        height: ScreenHeight * 3 / 100
    }
})

export default detailTrans