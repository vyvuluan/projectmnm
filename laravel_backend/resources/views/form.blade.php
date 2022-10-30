<form method="POST" action="{{url('/api/pay')}}">

        <input type="hidden" name="_token" value="<?php echo csrf_token() ?>">
        <button type="submit" name="redirect">VNPAY</button>

</form>
<form method="POST" action="{{url('/api/momo')}}">

        <input type="hidden" name="_token" value="<?php echo csrf_token() ?>">
        <button type="submit" name="payUrl">MOMOPAY</button>

</form>