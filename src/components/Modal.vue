<template>
<div class="background">
    <div class="modalWindow">
        <div class="messageWrapper">
            {{message}}
        </div>
        <div class="btnWrapper">
            <span @click="$emit('closeModal')" class="cancelBtn"></span>
            <span @click="$emit('confirm')" class="confirmBtn"></span>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    props:{
        message: String
    }
    
}
</script>

<style scoped>
    .background{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 100;
        background-color: rgba(0,0,0,0.7);
    }
    .btnWrapper{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        width: 80%;
    }
    .messageWrapper{
        font-weight: bold;
    }
    .modalWindow{
        /* position: absolute; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 101;
        background-color: #e0e0e0;
        width: 40%;
        border: 1px solid black;
        border-radius: 8px;
        padding: 15px;
        color: black;
    }
    .confirmBtn{
        background: url('../assets/icons/confirm-icon.png') no-repeat center;
        display: block;
        width: 25px;
        height: 25px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .cancelBtn{
        background: url('../assets/icons/cancel-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
</style>