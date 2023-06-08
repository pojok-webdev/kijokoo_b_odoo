drop trigger if exists generatekdticketodoo;
delimiter ||
create trigger generatekdticketodoo
before insert 
on ticketodoo for each row 
begin 
    select concat(year(now()),lpad(month(now()),2,0),case when mx is null then "001" else lpad(mx+1,3,0) end) into @newkdticket 
        from  (select substring(trim(max(kdticket)),7,3)mx 
            from ticketodoo where substring(kdticket,1,6)= concat(year(now()),lpad(month(now()),2,0)))X ;
    set new.kdticket = @newkdticket;
end||
delimiter ;