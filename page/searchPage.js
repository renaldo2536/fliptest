import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { CheckBox } from 'react-native-elements'
import { convertRupiah, convertDate } from '../page/components/converFunction'

const ScreenHeight = Dimensions.get("window").height
const ScreenWidth = Dimensions.get("window").width

function Home({ navigation }) {
    const [dataList, setDataList] = useState({})
    const [dataListDefault, setDataListDefault] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [dataSort, setDataSort] = useState([
        { id: 1, title: 'Name A-Z', checked: false },
        { id: 2, title: 'Nama Z-A', checked: false },
        { id: 3, title: 'Tanggal Terbaru', checked: false },
        { id: 4, title: 'Tanggal Terlama', checked: false }

    ])

    useEffect(() => {
        const fetchData = `https://nextar.flip.id/frontend-test`;
        axios.get(fetchData)
            .then((res) => {
                setDataList(res.data)
                setDataListDefault(res.data)
            })
    }, [])

    function search(value) {
        const newData = []
        Object.keys(dataListDefault).filter(key => {
            const data = dataListDefault[key]
            const name = data.beneficiary_name
            const beneficiaryBank = data.beneficiary_bank
            const senderBank = data.sender_bank

            if (name.includes(value) === true) {
                newData.push(dataListDefault[key])
                setDataList(newData)
            }
            if (beneficiaryBank.includes(value) === true) {
                newData.push(dataListDefault[key])
                setDataList(newData)
            }
            if (senderBank.includes(value) === true) {
                newData.push(dataListDefault[key])
                setDataList(newData)
            }
            if (data.amount.toString().includes(value) === true) {
                newData.push(dataListDefault[key])
                setDataList(newData)
            }
        })
    }

    function navigate(data) {
        navigation.navigate('Detail', { data })
    }

    async function sortBy(i) {
        const newData = []
        if (i === 0) {
            await Object.keys(dataListDefault)
                .sort((a, b) => dataListDefault[a].beneficiary_name.localeCompare(dataListDefault[b].beneficiary_name))
                .map((item, i) => newData.push(dataListDefault[item]));
            setDataList(newData)
        }
        else if (i === 1) {
            await Object.keys(dataListDefault)
                .sort((a, b) => dataListDefault[b].beneficiary_name.localeCompare(dataListDefault[a].beneficiary_name))
                .map((item, i) => newData.push(dataListDefault[item]));
            setDataList(newData)
        }
        else if (i === 2) {
            await Object.keys(dataListDefault)
                .sort((a, b) => dataListDefault[b].created_at.localeCompare(dataListDefault[a].created_at))
                .map((item, i) => newData.push(dataListDefault[item]));
            setDataList(newData)
        }
        else if (i === 3) {
            await Object.keys(dataListDefault)
                .sort((a, b) => dataListDefault[a].created_at.localeCompare(dataListDefault[b].created_at))
                .map((item, i) => newData.push(dataListDefault[item]));
            setDataList(newData)
        }
        setModalVisible(false)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../images/search.png')} resizeMode='cover' style={styles.searchImg} />
                    <TextInput style={{ flexDirection: 'row' }} placeholder='Cari nama, bank, atau nominal' onChangeText={(text) => { search(text) }} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 14, color: 'red' }}>Urutkan</Text>
                    <Image source={require('../images/downarrow.png')} resizeMode='cover' style={styles.downArrow} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {
                    Object.keys(dataList).map(function (key, index) {
                        const senderBank = dataList[key].sender_bank.toUpperCase()
                        const beneficiaryBank = dataList[key].beneficiary_bank.toUpperCase()
                        const status = dataList[key].status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'
                        const minus = status === 'Berhasil' ? '' : '- '
                        const backgroundColor = status === "Berhasil" ? 'green' : 'red'
                        const borderColor = status === "Berhasil" ? 'white' : 'red'
                        const beneficiaryName = dataList[key].beneficiary_name
                        const amount = dataList[key].amount
                        const createdAt = convertDate(dataList[key].created_at.substring(0, 10))

                        return (
                            <TouchableOpacity key={key} style={[styles.listDataContainer, { backgroundColor: backgroundColor }]} onPress={() => navigate(dataList[key])}>
                                <View style={styles.listDataContainerInside}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {`${senderBank} ➔ ${beneficiaryBank}`}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 15, top: 9 }}>
                                            {`${minus}${beneficiaryName}`}
                                        </Text>
                                        <View style={[styles.status, { borderColor: borderColor, backgroundColor: backgroundColor === 'green' ? backgroundColor : 'white' }]}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: status === 'Berhasil' ? 'white' : 'black' }}>
                                                {status}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15 }}>{`Rp${convertRupiah(amount)} • ${createdAt}`}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                onDismiss={() => setModalVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(125,125,125,0.7)', flex: 1 }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>URUTKAN</Text>
                        {dataSort.map((item, i) => {
                            return (
                                <CheckBox
                                    key={item.id}
                                    center
                                    title={item.title}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={item.checked}
                                    onPress={() => sortBy(i)}
                                    containerStyle={styles.checkBox}
                                    size={18}
                                    textStyle={{ fontSize: 18 }}
                                    checkedColor='#8c181b'
                                />
                            )
                        })}

                        <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)}>
                            <Text>
                                Kembali
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

Home.navigationOptions = ({ navigation }) => {
    const name = 'Transaction List Page';
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
        backgroundColor: 'rgba(128,128,128,0.2)',
        flex: 1,
        marginTop: 15
    },

    searchContainer: {
        width: ScreenWidth * 98 / 100,
        height: ScreenHeight * 8 / 100,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 5,
        flexDirection: 'row',
    },

    listDataContainer: {
        width: ScreenWidth * 95 / 100,
        height: ScreenHeight * 15 / 100,
        marginVertical: 10,
        alignSelf: 'center',
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5
    },

    listDataContainerInside: {
        width: ScreenWidth * 92.5 / 100,
        height: ScreenHeight * 15 / 100,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        padding: 10
    },

    status: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 7
    },

    backButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        width: ScreenWidth * 70 / 100,
        height: ScreenHeight * 5 / 100,
        backgroundColor: 'grey',
        borderRadius: 5
    },

    checkBox: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderColor: 'white'
    },

    downArrow: {
        width: ScreenWidth * 3 / 100,
        height: ScreenHeight * 2 / 100,
        marginHorizontal: 10, top: 4
    },

    searchImg: {
        width: ScreenWidth * 5.5 / 100,
        height: ScreenHeight * 3 / 100,
        marginHorizontal: 10
    },

    modalContainer: {
        width: ScreenWidth * 85 / 100,
        height: ScreenHeight * 60 / 100,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginTop: ScreenHeight * 20 / 100,
        borderRadius: 5
    },

    modalTitle: {
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 18,
        fontWeight: 'bold'
    }

})

export default Home